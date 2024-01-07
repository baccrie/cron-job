const User = require("../model/users");
const nodemailer = require("nodemailer");

const birthdayMesage = async () => {
  // find all users celebrating birthday today
  const usersToWish = await User.find({
    birthday: "today",
  });

  for (const i of users) {
    SendmailTransport(users.email);
  }
};

module.exports = birthdayMesage;
