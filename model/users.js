const { Schema, model } = require("mongoose");

const User = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  birthday: {
    type: String,
    required: true,
  },
});

module.exports = model("user", User);
