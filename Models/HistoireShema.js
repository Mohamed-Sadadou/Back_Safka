const mongoose = require('mongoose');
const Chap = require("../Models/ChapitreShema");
const HistoireShema =  new mongoose.Schema(
    {
        HistoireID:String,
        EtatAvancementHistoire:{
            type : String,
        },
        Image:[String],
        Chapitres:[Chap],
        Done:Boolean,
    }
);

module.exports = HistoireShema;