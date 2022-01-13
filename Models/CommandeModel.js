const mongoose = require('mongoose');
const Pcommande = require('./Pcommande');
const CommandeSchema = new mongoose.Schema(
    {
        id_Commande: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        Client: {
            type: String,
            required: true,
        },
        Produits:{
            type:[Pcommande],
            required: true,
        },
        Shop:{
            type: String,
            required: true,
        },
        TotalPayer:{
            type: String,
            required: true,
        },
        Date_Commande:{
             type:String,
             required: true,
        },
        Status:{
            type:String
        },
        
    }
);


module.exports = mongoose.model('Commande', CommandeSchema);