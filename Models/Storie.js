const mongoose = require('mongoose');
const Storie =  new mongoose.Schema(
    {
        Id_Storie:{
            type:String,
        },
        Auteur:{
            type:String
        },
        Image:{
            type:[String],
        },
       
    }
);

module.exports = Storie;