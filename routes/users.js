const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");
const checkToken = require("../middleware/checkToken");

router.post("/register/:accountType", usersController.postRegister);

router.post("/login/:accountType", usersController.postLogin);

router.get("/checkToken", checkToken, usersController.getCheckToken);

router.get("/getBandleaders", usersController.getBandleaders);

router.get("/getClientsForBandleader", checkToken, usersController.getClientsForBandLeader);

router.get("/getUserInfo", checkToken, usersController.getUserInfo);

router.patch("/editUserInfo", checkToken, usersController.editUserInfo);

router.patch("/sendClientSetlist", checkToken, usersController.sendClientSetlist);

module.exports = router;
