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

router.get("/getSuggestedSetList/:clientId", checkToken, bandleaderController.getSuggestedSetList);

router.post("/postCompletedSetList", checkToken, bandleaderController.postCompletedSetList);

router.get("/getClientSetListInfo/:clientId", checkToken, bandleaderController.getClientSetListInfo);

router.patch("/editCompletedSetList", checkToken, bandleaderController.editCompletedSetList);

module.exports = router;