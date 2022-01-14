const mongoose = require('mongoose');
const UserRole = require("./RoleUser");
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
        

    }
);



module.exports = mongoose.model('Shops',ShopSchema);