require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./model/users");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    User.find().then((users) => {
      console.log(users);
    })
  )
  .catch((err) => {
    console.log(err);
  });
