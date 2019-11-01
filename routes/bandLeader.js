const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const bandLeaderController = require("../controller/bandLeaderController");

router.post("/addSong", checkToken, bandLeaderController.postAddSong);

module.exports = router;