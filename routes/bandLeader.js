const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const bandLeaderController = require("../controller/bandLeaderController");

router.post("/addSong", checkToken, bandLeaderController.postAddSong);

router.get("/getSongs", checkToken, bandLeaderController.getSongs);

router.get("/getSong/:songId", checkToken, bandLeaderController.getSong);

router.delete("/deleteSong/:songId", checkToken, bandLeaderController.deleteSong);

router.patch("/editSong/:songId", checkToken, bandLeaderController.editSong);

router.get("/getClientSongs/:clientName", checkToken)

module.exports = router;