const mongoose = require('mongoose');

const Souvenir =  new mongoose.Schema(
    {
        Id_Souvenir:{
            type:String
        },
        Image:{
            type:String,
        },
        Challenge: {
            type:String,
        },
        Public:Boolean,
        
    }
);
//module.exports = mongoose.model('Souvenir', Souvenir);
module.exports = Souvenir;