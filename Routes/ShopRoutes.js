const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Shop = require('../Controller/Shop.Controller')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
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
         cb(null,appDir+"/upload");
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
  


router.post("/AjoutProduit",upload.array('img', 10), Shop.AjoutProduit);
router.post("/ModifierProduit", Shop.ModifiProduit);
router.delete("/SupprimerProduit", Shop.SupprimeProduit);
router.get("/GetAllProducts",Shop.getAllProducts);
router.post("/GetProduct", Shop.getProduct);





module.exports = router;