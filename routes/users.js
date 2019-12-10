const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");
const checkToken = require("../middleware/checkToken");

router.post("/register/:accountType", usersController.postRegister);

router.post("/login", usersController.postLogin);

router.get("/checkToken", checkToken, usersController.getCheckToken);

router.get("/getBandleaders", usersController.getBandleaders);

module.exports = router;
