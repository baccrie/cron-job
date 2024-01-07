const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cron = require("node-cron");
const birthdayMesage = require("./utils/birthdayMessage.js");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const userRouter = require("./routes/user");

cron.schedule("0", "7", "*", "*", "*", bithdayMessage);

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({ message: "api working" });
});

app.use("/api/v1/user", userRouter);

// error handler
app.use((req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  return res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
});

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then((result) => {
    console.log("Connection to db successful...");
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
