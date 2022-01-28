const router = require('express').Router();

const MissionController = require("../Controller/MissionController");

router.post("/AjoutMission",MissionController.AjoutMission);
router.post("/ModifierMission",MissionController.ModifierPlaceToGo);
router.post("/DoneMission",MissionController.DoneMission);
router.post("/AjoutGallery",MissionController.AjoutGallery);
router.post("/GetMission",MissionController.RecupMission);


module.exports = router;