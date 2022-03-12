const mongoose = require('mongoose');
const Notation = require("./Notation");
const { isEmail } = require('validator');

const ShopSchema = new mongoose.Schema(
    {
        id_Shop:{
            type:String,
            required: true,
            unique: true,
            trim: true
        },
        ShopName:{
            type:String,
            required: true,
            trim: true
        },
        ShopNumeroTel:{
            type:String,
            trim: true
        },
        ShopEmail:{
             type: String,
             validate: [isEmail],
             lowercase: true,
             trim:true
        },
        ShopAdress:{
            type:String,
            required: true,
        },
        ShopCategorie:{
            type:String,
            required: true, 
        },
        ShopDescription:{
            type:String,
        },
        statut:{
            type:String,
         },
        Notation :{
            type:Number,
        },
        Notations :{
            type:[Notation], 
        },
        

    }
);



module.exports = mongoose.model('Shops',ShopSchema);