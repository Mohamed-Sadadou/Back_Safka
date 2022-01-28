const mongoose = require('mongoose');

const Mission =  new mongoose.Schema(
    {
        Id_mission:{
            type:String
        },
        PlaceToGO:{
            type:mongoose.Schema.Types.ObjectID,
        },
       
        Gallery: {
            type: [mongoose.Schema.Types.ObjectID],
        }
    }
);
//module.exports = mongoose.model('Mission', Mission);
module.exports = Mission;