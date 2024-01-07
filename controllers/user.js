const User = require("../model/users");

const getUserInfo = (req, res) => {
  res.sendFile("index.html");
};

const saveUserInfo = (req, res, next) => {
  const { username, email, birthday } = req.body;

  const user = new User({ username, email, birthday });
  user
    .save()
    .then((result) => {
      res.status(200).json({
        status: "submission successful",
        detail: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUserInfo,
  saveUserInfo,
};
