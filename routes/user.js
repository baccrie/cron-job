const express = require("express");
const { getUserInfo, saveUserInfo } = require("../controllers/user");

const router = express.Router();

router.get("/getInfo", getUserInfo);
router.post("/saveInfo", saveUserInfo);

module.exports = router;
