const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const bandLeaderController = require("../controller/bandLeaderController");

router.post("/addSong", checkToken, bandLeaderController.postAddSong);

router.get("/getSongs", checkToken, bandLeaderController.getSongs);

router.get("/getSong/:songId", checkToken, bandLeaderController.getSong);

router.delete("/deleteSong/:songId", checkToken, bandLeaderController.deleteSong);

router.patch("/editSong/:songId", checkToken, bandLeaderController.editSong);

router.get("/getClientSongs/:clientId", checkToken, bandLeaderController.getClientSongs);

router.get("/getSuggestedSetlist/:clientId", checkToken, bandLeaderController.getSuggestedSetlist);

router.post("/postCompletedSetlist", checkToken, bandLeaderController.postCompletedSetlist);

module.exports = router;