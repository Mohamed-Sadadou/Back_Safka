const CommandeModel = require('../Models/CommandeModel');
const Shop = require('../Models/Shop')
const Product = require('../Models/ProduitModel')
const fs = require("fs");
var path = require('path');


function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
};
const CodifieIdProduit = (ref) => {
    return ['Pr', createdate(), ref, Math.floor(Math.random() * 1000000)].join('_');
};

//************************** SCRUD PRODUCT **************************************************************************************************/
//***************************** Ajout produit ******************************************/
module.exports.AjoutProduit = async (req, res) => {
    //console.log('on affiche le req  ', req.body);
    //console.log('on affiche le req  ', req.files);
    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })


    const {
        nomProduit,
        Categorie,
        SousCategorie,
        Ref_Shop,
        Prix,
        Stock,
        Couleur,
        Quantite,
        Description
    } = req.body;

    const id_produit = CodifieIdProduit(Ref_Shop);
    console.log('id_produit : ', id_produit, ' nomProduit : ', nomProduit, ' Ref_Shop : ', Ref_Shop);
    const Produit = new Product({
        id_produit,
        nomProduit,
        Categorie,
        SousCategorie,
        Ref_Shop,
        Prix,
        Photos: Links,
        Stock,
        Couleur,
        Quantite,
        Description
    });
    Produit.save()
        .then(() => res.status(201).json({ message: 'Produit créé !' }))
        .catch(error => res.status(400).json({ error }));


};
//***************************** Modifier produit ****************************************/
module.exports.ModifiProduit = async (req, res) => {
    console.log(req.body.id);
    const queryObj = {};
    queryObj[champs1] = camp1;
    try {
        await Product.findOneAndUpdate(
            { id_produit: req.body.id_produit },
            { $set: { queryObj } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- ok ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//***************** supprimer Produit  **************************************************/
module.exports.SupprimeProduit = async (req, res) => {

    try {
        await Product.remove({ id_produit: req.body.id_produit }).exec();
        res.status(200).json({ message: "Suppression effectuer avec succes. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
//***************************** All Products ********************************************/
module.exports.getAllProducts = async (req, res) => {
    const Produit = await Product.find();
    res.status(200).json(Produit);


}
//***************************** get produit *********************************************/
module.exports.getProductById = (req, res) => {

    Product.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log(' on a un souci : ' + err);
    });
};
module.exports.getProduct = (req, res) => {

    Product.findOne({ id_produit: req.body.id_produit }, (err, doc) => {
        if (!err) res.send(doc);
        else console.log(' on a un souci : ' + err);
    });
};
//***************************** Recup Produit Shop ***********************************/
module.exports.GetProduitsShop = async (req, res) => {
    console.log('le req ', req.body)
    try {
        await Product.find(
            { Ref_Shop: req.cookie.IdP },
            (err, docs) => {
                if (!err) { console.log("---- Voila ces Produits : ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};




//************************** SCRUD Commande **************************************************************************************************/
//***************************** Modifier Commande ***************************************/
module.exports.ModifCommande = async (req, res, status) => {
    console.log(req.body.id_commande);
    try {
        await CommandeModel.findOneAndUpdate(
            { id_commande: req.body.id_commande },
            { $set: { status: status } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- ok ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//***************************** Valider Commande ****************************************/
module.exports.ValiderCommande = (req, res) => {
    this.ModifCommande(req, res, 'Validé');
};
//***************************** Refuser Commande *****************************************/
module.exports.RefuserCommande = (req, res) => {
    this.ModifCommande(req, res, 'Refusé');
};
//***************************** Payer Commande *******************************************/
module.exports.PayerCommande = (req, res) => {
    this.ModifCommande(req, res, 'Payé');
};
//***************************** Recup Commande Shop ***********************************/
module.exports.GetComandesShop = async (req, res) => {

    console.log('le req ', req.body)
    try {
        await CommandeModel.find(
            { Shop: req.body.Shop },
            (err, docs) => {
                if (!err) { console.log("---- Voila ces commandes : ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    };
};




//************************** SCRUD Compte *****************************************************************/
//************************************************************************************/
module.exports.ModifCompteShopValidation = async (req, res, status) => {
   console.log('validation de compte');
    try {
        await Shop.findOneAndUpdate(
            { id_Shop: req.cookie.IdP },
            { $set: { Valide: status } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- Validation effectué ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//***************************** Valider Shop ****************************************/
module.exports.ValiderCompteShop = (req, res) => {
    this.ModifCompteShopValidation(req, res, 'Validé');
};
//***************************** Refuser Shop *****************************************/
module.exports.RefuserCompteShop = (req, res) => {
    this.ModifCompteShopValidation(req, res, 'Refusé');
};
//************************************************************************************/
module.exports.ModifCompteShop = async (req, res, Champ) => {
    console.log(req.body);
    const queryObj = {};
    queryObj[Champ] = req.body.New;
    try {
        await Shop.findOneAndUpdate(
            { id_Shop: req.cookie.IdP },
            { $set:queryObj},
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- Changement effectuer avec succes ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//***************************** Modifier ShopName ************************************/
module.exports.ModifieShopName = (req, res) => {
    this.ModifCompteShop(req, res, 'ShopName');
};
//***************************** Modifier ShopNumeroTel *******************************/
module.exports.ModifieShopNumeroTel = (req, res) => {
    this.ModifCompteShop(req, res, 'ShopNumeroTel');
};
//***************************** Modifier ShopEmail ***********************************/
module.exports.ModifieShopEmail = (req, res) => {
    this.ModifCompteShop(req, res, 'ShopEmail');
};
//***************************** Modifier ShopAdress **********************************/
module.exports.ModifieShopAdress = (req, res) => {
    this.ModifCompteShop(req, res, 'ShopAdress');
};
//***************************** Modifier ShopCategorie ********************************/
module.exports.ModifieShopCategorie = (req, res) => {
    this.ModifCompteShop(req, res, 'ShopCategorie');
};
//***************************** Modifier ShopDescription ******************************/
module.exports.ModifieShopDescription = (req, res) => {
    this.ModifCompteShop(req, res, 'ShopDescription');
};