const mongoose = require('mongoose');
//********************************************/
//********************************************/
const Groupe = new mongoose.Schema(
    {
        Id_groupe: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        GroupeName: {
            type: String,
            required: true,
            trim: true
        },
        ProfilePic : {
            type:[String],
        },
        Preference: {
            type: String,
            required: true

        },
        Membres:{
             type:[String],
        },
        Points:{
            type : Number ,
        },

        

    }
);
module.exports = mongoose.model('Groupe', Groupe);