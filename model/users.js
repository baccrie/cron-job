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
    type: Date,
    required: true,
  },
});

module.exports = model(User, "user");
