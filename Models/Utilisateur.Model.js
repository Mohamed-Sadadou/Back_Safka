const mongoose = require('mongoose');
//********************************************/
const HistoireShema = require("./HistoireShema");
const Souvenir = require("./Souvenir");
//********************************************/
const { isEmail } = require('validator');

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
        ProfilePic : {
            type:[String],
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
        Preferences:{
             type:[String],
        },
        Histoires:{
            type:[HistoireShema],
        },
        Points:{
            type : Number ,
        },
        Streak:{
            type : {
                Str : Number,
                date:String,
            },
        },
        Souvenirs:{
            type:[Souvenir],
        },

        

    }
);



module.exports = mongoose.model('Utilisateurs', UtilisateurSchema);