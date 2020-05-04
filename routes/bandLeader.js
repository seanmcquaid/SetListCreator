const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const bandleaderController = require("../controller/bandleaderController");

router.post("/addSong", checkToken, bandleaderController.postAddSong);

router.get("/getSongs", checkToken, bandleaderController.getSongs);

router.get("/getSong/:songId", checkToken, bandleaderController.getSong);

router.delete("/deleteSong/:songId", checkToken, bandleaderController.deleteSong);

router.patch("/editSong/:songId", checkToken, bandleaderController.editSong);

router.get("/getClientSongs/:clientId", checkToken, bandleaderController.getClientSongs);

router.get("/getSuggestedSetlist/:clientId", checkToken, bandleaderController.getSuggestedSetlist);

router.post("/postCompletedSetlist", checkToken, bandleaderController.postCompletedSetlist);

router.get("/getClientSetlistInfo/:clientId", checkToken, bandleaderController.getClientSetlistInfo)

module.exports = router;