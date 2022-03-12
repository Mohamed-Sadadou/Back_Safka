const mongoose = require('mongoose');
const Storie = require('./Storie');
const Challenge =  new mongoose.Schema(
    {
        Id_Challenge:{
            type:String
        },
        EtatAvancementChapitre:{
            type : String,
        },
        Image:[String],
        Done:Boolean,
    }
);
module.exports = mongoose.model('Challenge', Challenge);
//module.exports = Challenge;