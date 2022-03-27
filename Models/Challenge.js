const mongoose = require('mongoose');
const Storie = require('./Storie');
const Challenge =  new mongoose.Schema(
    {
        Id_Challenge:{
            type:String
        },
        Titre:{
            type:String,
        },
        Theme:{
            type:String,
        },
        Description:{
            type:String,
        },
        Image:{
            type:[String],
        },
        Point:{
            type:Number,
        },
        Stories:{
            type:[Storie],
        },
        Type:{
            type:String,
        },
        PlaceToGo:{
            type:String,
        },
    }
);
module.exports = mongoose.model('Challenge', Challenge);
//module.exports = Challenge;