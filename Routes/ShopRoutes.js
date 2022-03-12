const router = require('express').Router();
const Chek = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require("fs");
var i=0;
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
      
      console.log('on affiche le req  multer ',i++, req.body);
      const { nom } = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
      const path = `./uploads/gallery/Produits`
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
  


router.get("/GetAllShops",Chek.chekAdmin,Shop.getAllShops);
router.get("/GetShop",Shop.getShopByID);
router.post("/GetShop",Shop.getShop);      

router.post("/AjoutProduit",upload.array('imgProduit', 5), Shop.AjoutProduit);
router.post("/ModifierProduit", Shop.ModifiProduit);
router.delete("/SupprimerProduit", Shop.SupprimeProduit);
router.get("/GetAllProducts",Shop.getAllProducts);
router.get("/GetAllProductsEnattente",Shop.getAllProductsNonValide);
router.post("/GetProduct", Shop.getProduct);
router.get("/GetProduitsShop", Shop.GetProduitsShop);
router.get("/GetProduitsShopNonValide",Shop.GetProduitsShopNonValide);
router.post("/ValiderProduit",Shop.ValiderProduit);

router.post("/ValiderCommande", Shop.ValiderCommande);
router.post("/RefuserCommande", Shop.RefuserCommande);
router.post("/PayerCommande", Shop.PayerCommande);
router.post("/GetComandesShop", Shop.GetComandesShop);

router.post("/ValiderCompteShop",Chek.chekAdmin, Shop.ValiderCompteShop);
router.post("/RefuserCompteShop",Chek.chekAdmin, Shop.RefuserCompteShop);


router.post("/ModifieShopName", Shop.ModifieShopName);
router.post("/ModifieShopNumeroTel", Shop.ModifieShopNumeroTel);
router.post("/ModifieShopEmail", Shop.ModifieShopEmail);
router.post("/ModifieShopAdress", Shop.ModifieShopAdress);
router.post("/ModifieShopCategorie", Shop.ModifieShopCategorie);
router.post("/ModifieShopDescription", Shop.ModifieShopCategorie);

router.post("/NoteShop",Shop.NoteShop);
router.post("/RemoveNoteShop",Shop.EnleverNoteShop);
router.post("/GetNotesShop",Shop.getNotesShop);



module.exports = router;