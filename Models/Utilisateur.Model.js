const mongoose = require('mongoose');
//********************************************/

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
            type:[String],
        },
        MissionsDone:{
            type:[String],
        },
        

    }
);



module.exports = mongoose.model('Utilisateurs', UtilisateurSchema);