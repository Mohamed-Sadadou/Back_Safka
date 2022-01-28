const mongoose = require('mongoose');
const Localisation= require("./Localisation");

const PlaceToGO =  new mongoose.Schema(
    {
        ID_PlaceToGO:{
            type:String
        },
        Localisation: {
            type:Localisation,
        },
        Images:{
            type : [String],
        },
        Description: {
            type: String,
        }
    }
);
module.exports = mongoose.model('PlaceToGO', PlaceToGO);
