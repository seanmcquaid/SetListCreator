const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const bandLeaderController = require("../controller/bandLeaderController");

router.post("/addSong", checkToken, bandLeaderController.postAddSong);

router.get("/getSongs", checkToken, bandLeaderController.getSongs);

router.delete("/deleteSong", bandLeaderController.deleteSong);

module.exports = router;