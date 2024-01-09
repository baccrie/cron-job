const User = require("../model/users");
const nodemailer = require("nodemailer");
require("dotenv").config();

const birthdayMesage = async () => {
  // find all users celebrating birthday today

  const today = new Date();
  const allUsers = await User.find();

  console.log(allUsers);
  //let usersCelebratingToday = [];

  const usersCelebratingToday = allUsers.filter((users) => {
    return (
      //users.birthday.getDay() === today.getDay() &&
      users.birthday.getMonth() === today.getMonth()
    );
  });

  if (!usersCelebratingToday) {
    console.log("No User Celebrating today");
  } else {
    usersCelebratingToday.forEach((user) => {
      wishHappyBirthday(user);
    });
  }
};

function wishHappyBirthday(user) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.ADMIN_EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  let mailDetails = {
    from: `${process.env.ADMIN_EMAIL}`,
    to: `${user.email}`,
    subject: `Happy Birthday ${user.username}`,
    text: `Happy Birthday ${user.username} have a wonderful year ahead`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = birthdayMesage;
