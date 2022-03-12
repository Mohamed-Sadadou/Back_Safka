const mongoose = require('mongoose');
const Storie =  new mongoose.Schema(
    {
        Auteur:{
            type:String
        },
        Image:{
            type:String,
        },
       
    }
);

module.exports = Storie;