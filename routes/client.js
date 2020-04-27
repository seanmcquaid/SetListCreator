const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const clientController = require("../controller/clientController");

router.post("/addSong/:songType", checkToken, clientController.postAddSong);

router.get("/getSongs", checkToken, clientController.getSongs);

router.get("/getSong/:songId", checkToken, clientController.getSong);

router.delete("/deleteSong/:songId", checkToken, clientController.deleteSong);

router.patch("/editSong/:songId", checkToken, clientController.editSong);

router.get("/getCompletedSetlist", checkToken, clientController.getCompletedSetlist);

router.patch("/editCompletedSetlistComments", checkToken, clientController.editCompletedSetlistComments);

module.exports = router;