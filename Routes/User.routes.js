const router = require('express').Router();
const UtilisateurController =  require('../Controller/Utilisateur.Controller');
const Chek = require('../middleware/auth.middleware');
const multer = require('multer');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const fs = require("fs");
//const TableauDeBord=require('../routes/TableauDeBord.routes');
const ShopRoutes = require('./ShopRoutes');
//cc 
function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
    };
  const storage = multer.diskStorage({
    destination:function(req,file,cb){
      const path = `./upload/PDP`
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
      fileSize: 1024*1024*10
    },
    fileFilter:fileFilter
  });
  



//************************************* La creation des Comptes *******************************************************************************/
//------------- creer compte client ---------------------------------------------------
router.post("/CreeCompte",upload.array('imgCompte', 1),UtilisateurController.CreeCompte);
//------------- creer compte Shop depuis client ------------------------------------
router.post("/AjoutCompteShop",upload.array('imgShop', 3),UtilisateurController.CreeCompteShopFromClient);
//------------- creer compte Shop des le debut -------------------------------------
router.post("/CreeCompteShop",upload.array('imgShop', 3),UtilisateurController.CreeCompteShop);
//************************************* Les fonctionnalite de base de connection **************************************************************/
//------------- pour se connecter -----------------------------------------------------
router.post("/Connection",UtilisateurController.SeConnecter);
//------------- pour se deconnecter ---------------------------------------------------
router.get("/Deconnection",Chek.ChekUser,UtilisateurController.Deconnection);
//------------- pour modifier nom d'utilisateur ---------------------------------------
router.post("/Compte/ModifierUserName",Chek.ChekUser,UtilisateurController.ModifiUserName);
//------------- pour modifier Tel d'utilisateur ------------------------------------
router.post("/Compte/ModifierTelUtilisateur",Chek.ChekUser,UtilisateurController.ModifiUserTel);
//------------- pour modifier Mail d'utilisateur ------------------------------------
router.post("/Compte/ModifierMailUtilisateur",Chek.ChekUser,UtilisateurController.ModifiUserMail);
//------------- pour modifier Adress d'utilisateur ------------------------------------
router.post("/Compte/ModifierAdressUtilisateur",Chek.ChekUser,UtilisateurController.ModifiUserAdress);
//------------- pour modifier password ------------------------------------------------
router.post("/Compte/Modifierpassword",Chek.ChekUser,UtilisateurController.ModifiUserpassword);
//************************************* Les fonctionnalite de base d'un client ****************************************************************/


//------------- Effectuer une commande ------------------------------------------------ 
router.post("/AjoutCommande",UtilisateurController.AjoutCommande);
//------------- Afficher Commande Client ----------------------------------------------
router.post("/GetMesCommandes",UtilisateurController.GetComandesClients);

router.post("/LikeProduit",UtilisateurController.LikeProduit);
router.post("/DisLikeProduit",UtilisateurController.DisLikeProduit);
router.get("/GetLikedProducts",UtilisateurController.getLikedProducts);

router.post("/FollowShop",UtilisateurController.FollowShop);
router.post("/UnFollowShop",UtilisateurController.UnFollowShop);
router.get("/GetFollewShop",UtilisateurController.getFollowedShop);

router.post("/AddPreference",UtilisateurController.AddPreference);
router.post("/AddPreferences",UtilisateurController.AddPreferences);
router.post("/RemovePreference",UtilisateurController.RemovePreference);
router.get("/getPreferences",UtilisateurController.getPreferences);

router.post("/NoteProduit",UtilisateurController.NoteProduit);
router.post("/RemoveNoteProduit",UtilisateurController.EnleverNoteProduit);
router.post("/GetNotesProduit",UtilisateurController.getNotesProduct);


//------------- Afficher toutes les Commande ------------------------------------------
//************************************* fonctionnalite de base Affichage user user ************************************************************/
//************************************* pour renvoyer tout les utilisateurs *******************************************************************/
router.get("/Compte/GetAllUsers",UtilisateurController.getAllUsers);
//************************************* pour renvoyer un seul utilisateur *********************************************************************/
router.get("/Compte",Chek.ChekUser, UtilisateurController.getUser);
// recherche
router.post("/User",UtilisateurController.getUser2);
//************************************* routes Shop ****************************************************************************************/
router.use('/Shop',ShopRoutes);
//*********************************************************************************************************************************************/
module.exports = router;