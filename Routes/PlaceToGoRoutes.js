const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const { dirname } = require('path');
//*********************************************************/
const appDir = dirname(require.main.filename);
//*********************************************************/
const PlaceToGoController = require('../Controller/PlaceToGoController')
const Chek = require('../middleware/auth.middleware');
//*********************************************************/

   function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
    };
    //C:/Users/Sadadou Mohamed/Desktop/MASS/Safka/Back_Safka/upload
  const storage = multer.diskStorage({
    destination:function(req,file,cb){
      
      
      const { nom } = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
      const path = `./uploads/gallery/PlaceToGo`
      fs.mkdirSync(path, { recursive: true })
      cb(null, path)
        
    },
    filename:function(req,file,cb){
         cb(null,createdate()+'-'+file.originalname);
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
  



router.post("/AjoutPlaceToGo",upload.array('img', 15), PlaceToGoController.AjoutPlaceToGo);
router.post("/ModifierLocalisation",PlaceToGoController.ModifierLocalisation);
router.post("/ModifierDescription",PlaceToGoController.ModifierDescription);
router.post("/GetPlace",PlaceToGoController.GetPlace);
router.get("/GetPlaces",PlaceToGoController.GetAllPlaces);


module.exports = router;