const mongoose = require('mongoose');



const ProduitSchema = new mongoose.Schema(
    {
        id_produit: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        nomProduit: {
            type: String,
            required: true,
            trim: true
        },
        Categorie:{
            type: String,
            required: true
        },
        SousCategorie:{
               type:[String]
        },
        Ref_Shop: {
            type: String,
            required: true,
        },
        Prix: {
            type: Number,
            required: true,
        },
        Photos: {
            type: [String]
        },
        Stock: {
            type: Boolean
        },
        Couleur:{
            type: String,
            required: true,
        },
        Quantite: {
            type: Number
        },
        Description: {
            type: String,
            required: true,
            trim: true
        },
        
    }
);

module.exports = mongoose.model('Produits', ProduitSchema);