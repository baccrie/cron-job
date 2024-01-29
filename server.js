const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cron = require("node-cron");
const birthdayMessage = require("./utils/birthdayMessage.js");
const Users = require("./model/users");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const userRouter = require("./routes/user");

// Background task to wish users birthday at 7:00am everyday
cron.schedule("0 7 * * *", birthdayMessage, {
  scheduled: process.env.STARTCRONJOB,
});
// templating engines
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "api working" });
});
app.use("/api/v1/user", userRouter);

// error handler
app.use((error, req, res, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  return res.render("index", {
    err: error.message,
  });
});

// mongodb and express event listener
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then((result) => {
    console.log("Connection to db successful...");
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}....`);
    });
  })
  .catch((err) => {
    err.statusCode = 500;
    //err.message = "Unable to connect to the server at the moment";
    console.log(err);
  });
