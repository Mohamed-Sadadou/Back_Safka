const mongoose = require('mongoose');
const UserRole = require("./RoleUser");
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const UtilisateurSchema = new mongoose.Schema(
    {
        id_client:{
            type:String,
            required: true,
            unique: true,
            trim: true
        },
        mdp:{
            type:String,
            required: true
        },
        UserName:{
            type:String,
            required: true,
            trim: true
        },
        numeroTel:{
            type:String,
            required: true,
            trim: true
        },
        email:{
             type: String,
             required:true,
             validate: [isEmail],
             lowercase: true,
             trim:true
        },
        adress:{
            type:String,
            required: true,
            trim: true
        },
        role:{
            type:UserRole
        },
        Photos: {
            type: [String]
        },

    }
);



module.exports = mongoose.model('Utilisateurs',UtilisateurSchema);