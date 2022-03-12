const mongoose = require('mongoose');

const chal = require('../Models/ChallengShema');

const Chapitre =  new mongoose.Schema(
    {
        Chapitre:String,
        EtatAvancementChapitre:{
            type : String,
        },
        Image:[String],
        Challenges:[chal],
        Done:Boolean,
    }
);

module.exports = Chapitre;
