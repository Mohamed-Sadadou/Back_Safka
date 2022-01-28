const mongoose = require('mongoose');
const Image = require("./Image");
const Souvenir =  new mongoose.Schema(
    {
        Id_Souvenir:{
            type:String
        },
        Image:{
            type:String,
        },
        Public:Boolean,
        
    }
);
module.exports = mongoose.model('Souvenir', Souvenir);
//module.exports = Souvenir;