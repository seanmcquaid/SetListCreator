const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const clientController = require("../controller/clientController");

router.post("/addSong/:songType", checkToken, clientController.postAddSong);

module.exports = router;