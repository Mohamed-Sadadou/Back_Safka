const router = require('express').Router();
//*********************************************************/
const Challenge =  require("../Controller/ChallengeController");
const multer = require('multer');
const fs = require("fs");
//*********************************************************/
function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
    };
  const storage = multer.diskStorage({
    destination:function(req,file,cb){
      
      
      const { nom } = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
      const path = `./upload/Challenges`
      fs.mkdirSync(path, { recursive: true })
      cb(null, path)
        
    },
    filename:function(req,file,cb){
         cb(null,[createdate(), file.originalname].join(''));
    }
  });
  const fileFilter = (req, file, cb )=>{
  
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
      cb(null,true);
    }else{
      cb(new Error('Format non supporter'),false);
    }
  
  
  };
  const upload = multer({
    storage : storage,
    limits:{
      fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
  });
  const storage2 = multer.diskStorage({
    destination:function(req,file,cb){
      
      
      const { nom } = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
      const path = `./upload/Stories`
      fs.mkdirSync(path, { recursive: true })
      cb(null, path)
        
    },
    filename:function(req,file,cb){
         cb(null,[createdate(), file.originalname].join(''));
    }
  });
  const upload2 = multer({
    storage : storage2,
    limits:{
      fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
  });
//***************************0 */
//TESTED
router.post("/CreateChallenge",upload.array('ChallengeImage', 1),Challenge.CreateChallenge);
//TESTED
router.get("/AllChallenges",Challenge.GetAllChallenges);
//TESTED
router.post("/GetChallenge",Challenge.GetChallenge);
//*********************************************************/
//TESTED
router.post("/AjoutStorie",upload2.array('Story', 1),Challenge.AjoutStorie);
//TESTED
router.post("/EnleverStorie",Challenge.EnleverStorie);
//TESTED
router.post("/ModifierTitre",Challenge.ModifierTitre);
//TESTED
router.post("/ModifierTheme",Challenge.ModifierTheme);
//TESTED
router.post("/ModifierDescription",Challenge.ModifierDescription);
//TESTED
router.post("/ModifierPoint",Challenge.ModifierPoint);
//TESTED
router.post("/ModifierType",Challenge.ModifierType);
//TESTED
router.post("/ModifierPlaceToGo",Challenge.ModifierPlaceToGo);




module.exports = router;