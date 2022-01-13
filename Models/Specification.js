const mongoose = require('mongoose');


const Specification = new mongoose.Schema(
    {
        Label: {
            type: String,
            required: true,
        },
        Info:{
            type: String,
            required: true
        },      
    }
);

module.exports = Specification;