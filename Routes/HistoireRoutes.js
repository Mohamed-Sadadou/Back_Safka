const router = require('express').Router();
const multer = require('multer');

const fs = require("fs");
//*********************************************************/

//*********************************************************/
const UtilisateurController = require('../Controller/Utilisateur.Controller')
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
      
      
      const { nom } = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
      const path = `./upload/PDP`
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
  

//------------- compte client ---------------------------------------------------
router.post("/CreeCompte",upload.array('img', 1),UtilisateurController.CreeCompte);
router.post("/CompteUser",UtilisateurController.GetCompte);
router.get("/GetCompte",UtilisateurController.GetCompteUser);
router.get("/GetAllUsers",UtilisateurController.GetAllUsers);
router.get("/GetDonneesUser",UtilisateurController.RecupDonneesUser)

module.exports = router;