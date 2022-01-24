const UserModel = require('../Models/Utilisateur.Model');
const RoleU = require('../Models/RoleUser');
const ShopModel = require('../Models/Shop');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;
const Commande = require('../Models/CommandeModel')
const maxAge = 24 * 60 * 60 * 100;
const CODE = 'Token_secret_Safka';
const fs = require("fs");
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });
function CreateHeur() {
    var date = Date.now();
    var h = new Date(date), Heur = '' + h.getHours(), Minute = '' + h.getMinutes(), seconde = h.getSeconds();
    console.log('--------------------------------')
    console.log('--------------------------------')
    console.log('--------------------------------')

    console.log([Heur, Minute, seconde].join(':'))

    console.log('--------------------------------')
    console.log('--------------------------------')
    console.log('--------------------------------')

    return [Heur, Minute, seconde].join(':');
}
function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
};
function createdate2() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('/');
};
const CodifieIdClient = () => {
    return ['Cl', createdate(), Math.floor(Math.random() * 1000000)].join('_');
};
const CodifieIdShop = (Wilaya) => {
    return ['Shop', Wilaya, createdate(), Math.floor(Math.random() * 1000000)].join('_');
};
const CodifieCommande = () => {
    return ['Cm', createdate(), Math.floor(Math.random() * 10000000)].join('_');
};
//***************** creer un jeton adapté ************************************************************************************/
const createToken = (id) => {
    return jwt.sign({ userId: id }, CODE, { expiresIn: maxAge })

};
//***************************** creer compte utilisateur Client par defaut ***************************************************/
module.exports.CreeCompte = async (req, res) => {
    console.log('on affiche le req  ', req.body);
    console.log('on affiche le req  ', req.files);

    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })


    const role = 'Client';
    const numerp = null;
    RoleU.role = role;
    RoleU.numerp = numerp;
    const id_client = CodifieIdClient();

    const { mdp, UserName, numeroTel, email, adress } = req.body;

    console.log('id_client : ', id_client, ' nomUtilisateur : ', UserName, ' mdp : ', mdp);

    bcrypt.hash(mdp, 10)
        .then(hash => {
            console.log('le mdp: ', hash);
            const user = new UserModel({
                id_client, mdp: hash, UserName, numeroTel, email, adress, role: RoleU, Photos: Links
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};
//****************** creer compte admin par defaut ***************************************************************************/
module.exports.CreeCompte1 = async () => {
    //console.log('on affiche le req  ', req.body);
    const role = 'admin';
    const numerp = '60af9d1bed0b400e00ba47de';
    RoleU.role = role;
    RoleU.numerp = numerp;
    const idf = 101010101010;
    const mdp = 'mdp123';
    const nomUtilisateur = 'Admin';
    //const { idf, mdp, nomUtilisateur } = req.body;
    console.log('idf : ', idf, ' nomUtilisateur : ', nomUtilisateur, ' mdp : ', mdp);

    bcrypt.hash(mdp, 10)
        .then(hash => {
            console.log('le mdp: ', hash);
            const user = new UserModel({
                idf: idf, mdp: hash, UserName: nomUtilisateur, role: RoleU
            });
            user.save()
                .then(() => console.log("ok creer"))
                .catch(error => console.log("erreur"));
        })
        .catch(error => console.log("erreur"));

};
//************************ creer compte Shop *****************************************************************************/
module.exports.CreeCompteShop = async (req, res) => {

    console.log('on affiche le req  ', req.body);
    console.log('on va codifier');
    var id = CodifieIdShop(req.body.Wilaya);
    console.log('voici le id : ', id);
    const Shop = new ShopModel({
        id_Shop: id,
        ShopName: req.body.ShopName,
        ShopNumeroTel: req.body.ShopNumeroTel,
        ShopEmail: req.body.ShopEmail,
        ShopAdress: req.body.ShopAdress,
        ShopCategorie: req.body.ShopCategorie,
        ShopDescription: req.body.ShopDescription,
        statut: 'En attente',

    });
    console.log('on go save le shop ');
    Shop.save()
        .then(() => {
            console.log('lid est : ', Shop._id);
            RoleU.role = 'Shop';
            RoleU.numerp = Shop._id;
            const { mdp, UserName, numeroTel, email, adress } = req.body;
            const id_client = CodifieIdClient();
            bcrypt.hash(mdp, 10)
                .then(hash => {
                    console.log('le mdp: ', hash);
                    const user = new UserModel({
                        id_client, mdp: hash, UserName, numeroTel, email, adress, role: RoleU
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'Shop créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ message: 'probleme de hash' }));

        })
        .catch(error => { res.status(202).send({ message: 'probleme de sauv de Shop' }) });


};
//************************* creer compte Shop depuis client **************************************************************/
module.exports.CreeCompteShopFromClient = async (req, res) => {

    console.log('on affiche le req  ', req.body);

    var id = CodifieIdShop(req.body.Wilaya);
    console.log('on va codifier');
    const Shop = new ShopModel({
        id_Shop: id,
        ShopName: req.body.ShopName,
        ShopNumeroTel: req.body.ShopNumeroTel,
        ShopEmail: req.body.ShopEmail,
        ShopAdress: req.body.ShopAdress,
        ShopCategorie: req.body.ShopCategorie,
        ShopDescription: req.body.ShopDescription,
        statut: 'En attente',
    });
    console.log('on go save Shop ');
    Shop.save()
        .then(() => {
            RoleU.role = 'Shop';
            RoleU.numerp = Shop._id;
            try {
                UserModel.findOneAndUpdate(
                    { id_client: req.body.id_client },
                    { $set: { role: RoleU } },
                    { new: true, upsert: true, setDefaultsOnInsert: true },
                    (err, docs) => {
                        if (!err) { console.log("---- Shop Creer ----"); return res.status(200).json(docs); }
                        else { return res.status(500).send({ message: err }); }
                    }
                )
            } catch (err) {
                return res.status(500).json({ message: err });
            }
        })
        .catch(error => { res.status(202).send({ message: error }) });


};
//***************** Se connecter *********************************************************************************************/
module.exports.SeConnecter = async function SeConnecter(req, res, next) {

    await UserModel.findOne({ id_client: req.body.id_client })
        .then(user => {
            if (!user) {
                return res.status(201).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.mdp, user.mdp)
                .then(valid => {
                    if (!valid) {
                        return res.status(202).json({ error: 'Mot de passe incorrect !' });
                    }

                    const token = createToken(user._id);
                    const role = createToken(user.role.role);

                    console.log('le role : ', user.role.role);
                    console.log('CONNECTER');
                    res.cookie('jwt', token, { httpOnly: true, maxAge });
                    res.cookie('role', role, { httpOnly: true, maxAge });
                    res.cookie('id_client', (req.body.id_client).replace(/ /g, ""), { httpOnly: true, maxAge });
                    res.cookie('UserName', user.UserName, { httpOnly: true, maxAge });
                    res.cookie('IdP', user.role.numerp, { httpOnly: true, maxAge });
                    res.status(200).json({ user: user._id, role: user.role.role, id_client: req.body.id_client });

                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
//******************************* Se deconnecter  ****************************************************************************/
module.exports.Deconnection = (req, res) => {
    console.log('ON va se deconnecter');
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('role', '', { maxAge: 1 });
    res.cookie('id_client', '', { maxAge: 1 });
    res.cookie('UserName', '', { maxAge: 1 });
    res.cookie('roles', '', { maxAge: 1 });
    res.cookie('IdP', '', { maxAge: 1 });

    res.status(200).json('/');
};
//******************************* Reperer les info artisan ****************************************************************************/
module.exports.RecupeDonneesShop = async function RecupeDonneesShop(req, res, next) {

    const token = req.cookies.jwt;
    const NumerP = req.cookies.IdP;
    if (token) {
        await ShopModel.findById(NumerP)
            .then(Shop => {
                if (!Shop) {
                    return res.status(201).json({ error: 'Shop non trouvé !' });
                }

                if (Shop.statut == "Refusé" || Shop.statut == "En attente") {
                    res.status(200).json({ message: 'Compte pas encore valider pour se connecter au shop !', Valide: Shop.Valide })
                } else {
                    res.cookie('id_Shop', Shop.id_Shop, { httpOnly: true, maxAge });
                    res.cookie('ShopName', Shop.ShopName, { httpOnly: true, maxAge });
                    res.cookie('ShopNumeroTel', Shop.ShopNumeroTel, { httpOnly: true, maxAge });
                    res.cookie('ShopEmail', Shop.ShopEmail, { httpOnly: true, maxAge });
                    res.cookie('ShopAdress', Shop.ShopAdress, { httpOnly: true, maxAge });
                    res.cookie('ShopCategorie', Shop.ShopCategorie, { httpOnly: true, maxAge });
                    res.cookie('ShopDescription', Shop.ShopDescription, { httpOnly: true, maxAge });

                    res.status(200).json({ id_Shop: Shop.id_Shop, ShopName: Shop.ShopName, ShopAdress: Shop.ShopAdress, ShopNumeroTel: Shop.ShopNumeroTel, ShopEmail: Shop.ShopEmail, ShopCategorie: Shop.ShopCategorie, ShopDescription: Shop.ShopDescription, Statut: Shop.statut })
                }
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'Utilisateur Non connecté ! ' });
    }

};
//******************************* Reperer les info Client ****************************************************************************/
module.exports.RecupDonneesClient = (req, res, next) => {
    const token = req.cookies.jwt;
    const role = req.cookies.role;
    console.log('on chek ce token :', token);
    console.log('on chek ce token :', role);
    if (token) {
        jwt.verify(token, CODE, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                console.log('on va retourné 201')
                next();
                res.status(201).json();
            } else {
                if (role) {
                    jwt.verify(role, CODE, async (err, decodedrole) => {
                        if (err) {
                            res.locals.user = null;
                            res.cookies('role', '', { maxAge: 1 });
                            next();
                        } else {
                            console.log('les roles ', req.cookies.roles)
                            console.log('on va send la request et les context !!! ' + 'id:' + decodedToken.userId, 'role:' + decodedrole.userId, 'IDf:' + req.cookies.IDF)
                            res.status(200).json({ id: decodedToken.userId, role: decodedrole.userId, id_client: req.cookies.id_client, UserName: req.cookies.UserName, UserPrenom: req.cookies.UserPrenom, IdP: req.cookies.IdP })
                        }
                    }
                    )
                } else {
                    console.log('mauvais token');
                    res.status(201).json({ error: 'Pas de role asigné erreur' });

                }
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.status(201).json({ error: 'Utilisateur Non connecté !' });
    }
}
//***************** afficher tout les utilisateurs ***************************************************************************/
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-mdp');
    res.status(200).json(users);
};
//***************** afficher un seul utilisateur *******************************************************************************/
module.exports.getUser = (req, res) => {

    const token = req.cookies.jwt;
    console.log('on chek ce token :', token);
    if (token) {
        jwt.verify(token, CODE, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                console.log('on chek ce token :', decodedToken.userId);
                UserModel.findById(decodedToken.userId, (err, docs) => {
                    if (!err) res.status(200).json(docs);
                    else console.log(' on a un souci : ' + err);
                }).select('-mdp');
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'ta pas le droit frere' });
    }


};
module.exports.getUser2 = (req, res) => {
    UserModel.find({id_client:req.body.id_client}, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    }).select('-mdp');
};
//***************************************************************************** modification d utilisateur **********************************/
//***************** modification du nom d'utilisateur **********/
module.exports.ModifiUserName = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_client: req.body.id_client },
            { $set: { UserName: req.body.UserName } },
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
//***************** modification du mot de passe   ***********/
module.exports.ModifiUserpassword = async (req, res) => {
    console.log(req.body.id_client);

    console.log('on fait le try de modifie password');
    const salt = await bcrypt.genSalt();
    req.body.mdp = await bcrypt.hash(req.body.mdp, salt);

    try {
        await UserModel.findOneAndUpdate(
            { id_client: req.body.id_client },
            { $set: { mdp: req.body.mdp } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log('ok'); return res.status(200).json(docs); }
                else return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//***************** modification du Numero de l'utilisateur **********/
module.exports.ModifiUserTel = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_client: req.body.id_client },
            { $set: { numeroTel: req.body.numeroTel } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- ok ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
//***************** modification du mail de l'utilisateur **********/
module.exports.ModifiUserMail = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_client: req.body.id_client },
            { $set: { email: req.body.email } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- ok ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
//***************** modification de l'adress de l'utilisateur **********/
module.exports.ModifiUserAdress = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_client: req.body.id_client },
            { $set: { adress: req.body.adress } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- ok ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
//***************** modification le role  **********/
module.exports.Modifirole = async (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send('id inconnu de la database : ' + req.params.id);

    const role = require('../Models/RoleUser');

    role.role = req.body.role;
    role.numerp = req.body.num

    try {
        await UserModel.findOneAndUpdate(
            { id_client: req.params.id_client },
            { $set: { role: role } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//***************** supprimer utilisateur  *****/
module.exports.SupprimeUser = async (req, res) => {
    try {
        await ShopModel.remove({ id_Shop: req.body.id_Shop }).exec();
        await UserModel.remove({ id_client: req.body.id_client }).exec();
        res.status(200).json({ message: "Suppression effectuer avec succes. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//***************************** faire commande  *******************************************************/
//**** les produits doivent etre envoyé sous forme d'une liste d'objet 'produit' et id de ceux ci envoyé par le front  *******/
module.exports.AjoutCommande = async (req, res) => {
    console.log('on affiche le req  ', req.body);

    const id_commande = CodifieCommande();
    const DateCommande = createdate2() + "-" + CreateHeur();
    const status = "En attente";
    console.log('id_commande : ', id_commande, ' DateCommande : ', DateCommande, ' status : ', status);


    const Com = new Commande({
        id_Commande: id_commande, Client: req.body.Client, Date_Commande: DateCommande, Produits: req.body.Produits, TotalPayer: req.body.TotalPayer, Status: status
    });
    Com.save()
        .then(() => res.status(201).json({ message: 'Commande créé !' }))
        .catch(error => res.status(400).json({ error }));
};
//*********************** Recuperer les comandes **************** */
module.exports.GetComandesClients = async (req, res) => {
    console.log(req.body.Client);
    try {
        await Commande.findOne(
            { Client: req.body.Client },
            (err, docs) => {
                if (!err) { console.log("---- Voila ces commandes : ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//*********************** Recuperer Toutes les commandes ***********************************************************/
module.exports.getAllCommandes = async (req, res) => {
    const Commandes = await Commande.find();
    res.status(200).json(Commandes);
};

