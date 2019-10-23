const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");

router.post("/register/:accountType", usersController.postRegister);

router.post("/login", usersController.postLogin);

module.exports = router;
