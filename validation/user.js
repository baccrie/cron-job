const joi = require("joi");

const userSchema = joi.object({
  username: joi.string().min(5).max(25).required(),

  email: joi.string().email().required(),

  birthday: joi.date().required(),
});

module.exports = userSchema;
