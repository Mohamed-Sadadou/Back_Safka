const mongoose = require('mongoose');

const Localisation =  new mongoose.Schema(
    {
        Langitude:{
            type:String
        },
        Latitude:{
            type:String
        }
    }
);

module.exports = Localisation;