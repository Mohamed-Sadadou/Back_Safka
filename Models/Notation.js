const mongoose = require('mongoose');

const Notation =  new mongoose.Schema(
    {
        Auteur:{
            type: String
        },
        Note:{
            type:Number        }
    }
);

module.exports = Notation;