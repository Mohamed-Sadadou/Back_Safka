const mongoose = require('mongoose');
const Mission = require("./Mission");
const Challenge =  new mongoose.Schema(
    {
        Id_Challenge:{
            type:String
        },
        Missions:{
            type:[Mission],
        },
        Day:{
            type:String,
        },
    }
);
module.exports = mongoose.model('Challenge', Challenge);
//module.exports = Challenge;