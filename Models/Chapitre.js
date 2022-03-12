const mongoose = require('mongoose');



const Chapitre =  new mongoose.Schema(
    {
        ID_Chapitre:{
            type:String,
            required: true,
            unique: true,
            trim: true
        },
        Titre:{
            type:String
        },
        Theme:{
            type:String,
        },
        Image: {
            type:[String]
        },
        Description:{
            type:String
        },
        Challenges:{
            type:[String],
        },
    }
);

module.exports = Chapitre;
