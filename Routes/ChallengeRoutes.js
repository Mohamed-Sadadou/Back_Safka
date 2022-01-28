const router = require('express').Router();
//*********************************************************/
const Challenge =  require("../Controller/ChallengeController");
//*********************************************************/


router.get("/AllChallenges",Challenge.GetAllChallenges);
router.post("/GetChallenge",Challenge.GetChallenge);
router.post("/CreateChallenge",Challenge.CreateChallenge);



module.exports = router;