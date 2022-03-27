const router = require('express').Router();
const multer = require('multer');

const fs = require("fs");
//*********************************************************/

//*********************************************************/
const HistoireController = require('../Controller/HistoireController');
const Chek = require('../middleware/auth.middleware');
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
    
      const path = `./upload/Histoire`
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
    
      const path = `./upload/Chapitres`
      fs.mkdirSync(path, { recursive: true })
      cb(null, path)
        
    },
    filename:function(req,file,cb){
         cb(null,[createdate(), file.originalname].join(''));
    }
  });
  const fileFilter2 = (req, file, cb )=>{
  
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
      cb(null,true);
    }else{
      cb(new Error('Format non supporter'),false);
    }
  
  
  };
  const upload2 = multer({
    storage : storage2,
    limits:{
      fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
  });
  

//------------- compte client ---------------------------------------------------
//TESTED
router.post("/CreateHistoire",upload.array('img', 1),HistoireController.CreateHistoire);
//TESTED
router.post("/GetHistoire",HistoireController.GetHistoire);
//TESTED
router.get("/GetAllHistoire",HistoireController.GetAllHistoire);
//TESTED
router.post("/ModifiTitreHistoire",HistoireController.ModifiTitreHistoire);
//TESTED
router.post("/ModifiDescriptionHistoire",HistoireController.ModifiDescriptionHistoire);
//
router.post("/SupprimeHistoire",HistoireController.SupprimeHistoire);
//*********************Chapitres**************************/
//TESTED
router.post("/AjoutChapitre",upload2.array('img', 1),HistoireController.AjoutChapitreHistoire);
//TESTED
router.post("/ModifiChapitreTitreHistoire",HistoireController.ModifiChapitreTitreHistoire);
//TESTED
router.post("/ModifiChapitreThemeHistoire",HistoireController.ModifiChapitreThemeHistoire);
//TESTED
router.post("/ModifiChapitreDescriptionHistoire",HistoireController.ModifiChapitreDescriptionHistoire);
//
//*********************Challenges*************************/
//
router.post("/ModifiChapitreAjoutChallengesHistoire",HistoireController.ModifiChapitreAjoutChallengesHistoire);
//

module.exports = router;