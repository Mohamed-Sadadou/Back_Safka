const mongoose = require('mongoose');


const Pcommande = new mongoose.Schema(
    {
        ProduitC: {
            type: String,
            required: true,
        },
        QuantiteC:{
            type: String,
            required: true
        },      
    }
);

module.exports = Pcommande;