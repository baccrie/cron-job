const User = require("../model/users");
const userSchema = require("../validation/user");

const getUserInfo = (req, res) => {
  console.log("working");
  res.render("index", {
    err: "",
  });
};

const saveUserInfo = (req, res, next) => {
  console.log(req.body);
  const dob = new Date(req.body.birthday);
  dob.setMinutes(dob.getMinutes() + dob.getTimezoneOffset());

  req.body.birthday = dob;
  console.log(req.body);

  // validation with joi upcoming

  const { username, email, birthday } = req.body;
  const { result, error } = userSchema.validate(req.body);

  if (error) {
    return res.render("index", {
      status: "NOTOK",
      err: error.details[0].message,
    });
  }

  // check existing user
  User.findOne({ email })
    .then((checkUser) => {
      if (checkUser) {
        return res.render("index", {
          err: "User with email already exists",
        });
      } else {
        const user = new User(req.body);
        user.save().then((result) => {
          console.log("saving ongoing");
          return res.send(
            `<h3 style='margin: auto'>Submission Successful</h3>`
          );
        });
      }
    })
    .catch((err) => {
      err.statusCode = 401;
      err.message = "unable to submit credentials";
      next(err);
    });
};

module.exports = {
  getUserInfo,
  saveUserInfo,
};
