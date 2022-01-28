const UserModel = require('../Models/Utilisateur.Model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const maxAge = 24 * 60 * 60 * 100;
const CODE = 'Token_secret_TAHADIORAN';


function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
};
const CodifieId = () => {
    return ['User', createdate(), Math.floor(Math.random() * 1000000)].join('_');
};
//***************** creer un jeton adapté ************************************************************************************/
const createToken = (id) => {
    return jwt.sign({ userId: id }, CODE, { expiresIn: maxAge })

};
//***************************** creer compte utilisateur ***************************************************/
module.exports.CreeCompte = async (req, res) => {
    console.log('on affiche le req  ', req.body);
    console.log('on affiche le req  ', req.files);

    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })

    const id_User = CodifieId();
    const doneChal = false;
    const { UserName,email,mdp} = req.body;

    console.log('UserName : ', UserName, ' email : ', email, ' mdp : ', mdp);

    bcrypt.hash(mdp, 10)
        .then(hash => {
            console.log('le mdp: ', hash);
            const user = new UserModel({  
                id_User,
                UserName,
                email,
                mdp: hash,
                ProfilePic: Links
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};
//***************** Se connecter *********************************************************************************************/
module.exports.SeConnecter = async function SeConnecter(req, res, next) {
    await UserModel.findOne({ id_User: req.body.id_User })
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
                    console.log('CONNECTER');
                    res.cookie('jwt', token, { httpOnly: true, maxAge });
                    res.cookie('id_User', (req.body.id_User).replace(/ /g, ""), { httpOnly: true, maxAge });
                    res.cookie('UserName', user.UserName, { httpOnly: true, maxAge });
                    res.status(200).json({ user: user._id, id_User: req.body.id_User });

                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
//******************************* Se deconnecter  ****************************************************************************/
module.exports.Deconnection = (req, res) => {
    console.log('ON va se deconnecter');
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('id_User', '', { maxAge: 1 });
    res.cookie('UserName', '', { maxAge: 1 });
    res.status(200).json('/');
};
//******************************* Reperer les info user ****************************************************************************/
module.exports.RecupDonneesUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('on chek ce token :', token);
    if (token) {
        jwt.verify(token, CODE, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                console.log('on va retourné 201')
                next();
                res.status(201).json();
            } else {
                res.status(200).json({ id: decodedToken.userId,id_User: req.cookies.id_User, UserName: req.cookies.UserName })  
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.status(201).json({ error: 'Utilisateur Non connecté !' });
    }
}
//***************** afficher tout les utilisateurs ***************************************************************************/
module.exports.GetAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-mdp');
    res.status(200).json(users);
};
//***************** afficher un seul utilisateur *******************************************************************************/
module.exports.GetCompteUser = (req, res) => {

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
module.exports.GetCompte = (req, res) => {
    UserModel.find({id_User:req.body.id_User}, (err, docs) => {
        if (!err) {console.log("on a trouver !! "); res.status(200).json(docs);}
        else console.log(' on a un souci : ' + err);
    }).select('-mdp');
};
//***************************************************************************** modification d utilisateur **********************************/
//***************** modification du nom d'utilisateur **********/
module.exports.ModifiUserName = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_User: req.body.id_User },
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
    console.log(req.body.id_User);

    console.log('on fait le try de modifie password');
    const salt = await bcrypt.genSalt();
    req.body.mdp = await bcrypt.hash(req.body.mdp, salt);

    try {
        await UserModel.findOneAndUpdate(
            { id_User: req.body.id_User },
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
//***************** modification du mail de l'utilisateur **********/
module.exports.ModifiUserMail = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_User: req.body.id_User },
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
//***************** modification de la PDP de l'utilisateur **********/
module.exports.ModifiProfilePic = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_User: req.body.id_User },
            { $set: { adress: req.body.ProfilePic } },
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
//***************** modification ajout d'un challenge a l'utilisateur **********/
module.exports.AddChallenge = async (req, res) => {
    try {
        await UserModel.findOneAndUpdate(
            { id_User: req.body.id_User },
            { $addToSet: { Challenges: req.body.IdChallenge } },
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
//***************** modification suppression d'un challenge a l'utilisateur **********/
module.exports.EnleverChallenge = async (req, res) => {
    try {
        await UserModel.findOneAndUpdate(
            { id_User: req.body.id_User },
            { $pull: { Challenges:req.body.IdChallenge }  },
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
//***************** done challenge **********/
module.exports.DoneChallenge = async (req, res) => {

    try {
        await UserModel.findOneAndUpdate(
            { id_User: req.body.id_User },
            { $set: { doneChal: true } },
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
//***************** supprimer utilisateur  *****/
module.exports.SupprimeUser = async (req, res) => {
    try {
        
        await UserModel.remove({ id_client: req.body.id_client }).exec();
        res.status(200).json({ message: "Suppression effectuer avec succes. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};