const mongoose = require('mongoose');
const Chapitre = require("./Chapitre");
const Histoire = new mongoose.Schema(
    {
        IdHistoire: {
            type: String,
        },
        Titre: {
            type: String
        },
        Description: {
            type: String
        },
        Image: {
            type: [String]
        },
        Chapitres: {
            type: [Chapitre],
        },
        TypeHistoire: {
            type: String,
        },
        Longuer: {
            type: String,
        },
        Points: {
            type: Number,
        },
        Nbr_Users: {
            type: Number,
        }
    }
);
module.exports = mongoose.model('Histoire', Histoire);
//module.exports = Challenge;