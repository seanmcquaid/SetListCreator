const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");
const checkToken = require("../middleware/checkToken");

router.post("/register/:accountType", usersController.postRegister);

router.post("/login/:accountType", usersController.postLogin);

router.get("/checkToken", checkToken, usersController.getCheckToken);

router.get("/getBandleaders", usersController.getBandleaders);

router.get("/getClientsForBandleader", checkToken, usersController.getClientsForBandleader);

router.get("/clientInfo/:clientId", checkToken, usersController.getClientInfo);

router.get("/getUserInfo", checkToken, usersController.getUserInfo);

router.patch("/editUserInfo", checkToken, usersController.editUserInfo);

router.patch("/sendClientSetList", checkToken, usersController.sendClientSetList);

router.delete("/deleteUser", usersController.deleteUser);

module.exports = router;
