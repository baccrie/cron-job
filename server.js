const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public", "index.html")));

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
