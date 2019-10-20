const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");

router.post('/register', usersController.postRegister);

module.exports = router;
