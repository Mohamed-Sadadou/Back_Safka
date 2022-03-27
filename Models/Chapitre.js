const mongoose = require('mongoose');
const { Schema } = mongoose;


const Chapitre =  new mongoose.Schema(
    {
        ID_Chapitre:{
            type:String,
            required: true,
            unique: true,
            trim: true
        },
        Titre:{
            type:String
        },
        Theme:{
            type:String,
        },
        Image: {
            type:[String]
        },
        Description:{
            type:String
        },
        Challenges:{
            type:[{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
        },
    }
);
//module.exports = mongoose.model('Chapitre', Chapitre);
module.exports = Chapitre;
