const mongoose = require('mongoose');
//********************************************/
const Localisation= require("./Localisation");
const Challenge = require("./Challenge");
const Image = require("./Image");
//********************************************/
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
//********************************************/
const UtilisateurSchema = new mongoose.Schema(
    {
        id_User: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        UserName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        mdp: {
            type: String,
            required: true
        },
        Challenges:{
            type:[mongoose.Schema.Types.ObjectID],
        },
        doneChal : Boolean,
        ProfilePic : {
            type:Image,
        },
        MissionsDone:{
            type:[String],
        },
        

    }
);



module.exports = mongoose.model('Utilisateurs', UtilisateurSchema);