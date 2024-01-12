const User = require("../model/users");
const userSchema = require("../validation/user");

const getUserInfo = (req, res) => {
  res.sendFile("index.html");
};

const saveUserInfo = (req, res, next) => {
  console.log(req.body);
  const dob = new Date(req.body.birthday);
  dob.setMinutes(dob.getMinutes() + dob.getTimezoneOffset());

  // comment here
  req.body.birthday = dob;
  console.log(req.body);

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
  console.log(user.birthday.getYear() === new Date().getYear());
  // user
  //   .save()
  //   .then((result) => {
  //     res.status(200).json({
  //       status: "submission successful",
  //       detail: result,
  //     });
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     err.statusCode = 401;
  //     err.message = "unable to submit credentials";
  //     next(err);
  //   });
};

module.exports = {
  getUserInfo,
  saveUserInfo,
};
