const mongoose = require('mongoose');

const RoleUserSchema =  new mongoose.Schema(
    {
        role:{
            type: String
        },
        numerp:{
            type:mongoose.Schema.Types.ObjectID
        }
    }
);

module.exports = RoleUserSchema;