const User = require("../model/users");
const userSchema = require("../validation/user");

const getUserInfo = (req, res) => {
  res.sendFile("index.html");
};

const saveUserInfo = (req, res, next) => {
  const dob = new Date(req.body.birthday);
  req.body.birthday = dob;

  const { username, email, birthday } = req.body;
  const { result, error } = userSchema.validate(req.body);

  if (error) {
    return res.status(401).json({
      status: "errr",
      msg: error.details[0].message,
    });
  }

  //console.log();
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.status(200).json({
        status: "submission successful",
        detail: result,
      });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUserInfo,
  saveUserInfo,
};
