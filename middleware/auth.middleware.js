const jwt = require('jsonwebtoken');
const UserModel = require('../Models/Utilisateur.Model');
const CODE ='Token_secret_Safka';
const url = require('url');
const maxAge = 24 * 60 * 60 * 100;


module.exports.ChekUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('on chek ce token :', token);
    if (token) {
        jwt.verify(token, CODE, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {
                let user = await UserModel.findById(decodedToken._id);
                res.locals.user = user;
                console.log(user);
                next();
            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        return res.status(404).json({ error: 'Utilisateur Non connecté !' });
    }
};
module.exports.chekType = (req, res, next, type) => {
    const role = req.cookies.role;
    console.log('on chek ce token :', role);
    if (role) {
        jwt.verify(role, CODE, async (err, decodedrole) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 });
                next();
            } else {

                console.log('voila le role :', decodedrole.userId);
                if (decodedrole.userId == type) {
                    next();
                } else {
                    console.log('mauvais token');
                    res.locals.user = null;
                    res.status(201).json({ error: 'Role non correspondant a la requette' });
                }

            }
        }
        )
    } else {
        console.log('mauvais token');
        res.locals.user = null;
        res.status(201).json({ error: 'Utilisateur Non connecté !' });

    }

};
module.exports.chekAdmin = (req, res, next) => {
    this.chekType(req, res, next, 'Admin');
};
module.exports.chekShop = (req, res, next) => {
    this.chekType(req, res, next, 'Shop');
};

