const getUserInfo = (req, res) => {
  res.sendFile("index.html");
};

const saveUserInfo = (req, res, next) => {
  console.log("User Info getting in progress...");
};
