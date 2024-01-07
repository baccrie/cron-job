const User = require("../model/users");
const nodemailer = require("nodemailer");

const birthdayMesage = async () => {
  // find all users celebrating birthday today

  const today = new Date();
  const allUsers = await User.find();

  console.log(allUsers);
  let usersCelebratingToday = [];

  for (const i of allUsers) {
    if (
      (i.birthday.getDay() === today.getDay()) &
      (i.birthday.getMonth() === today.getMonth())
    ) {
      usersCelebratingToday.push(i);
    }
  }
  // const usersCelebratingToday = allUsers.filter((users) => {
  //   return (
  //     (users.birthday.getDay() === today.getDay()) &
  //     (users.birthday.getMonth() === today.getMonth())
  //   );
  // });

  console.log(usersCelebratingToday);
};

module.exports = birthdayMesage;
