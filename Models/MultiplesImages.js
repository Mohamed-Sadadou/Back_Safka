var mongoose = require('mongoose');
var Img = require('./ImageSchema');
var imagesSchema = new mongoose.Schema({
    im: [Img],
    
});
  
//Image is a model which has a schema imageSchema
module.exports = imagesSchema;
//module.exports = new mongoose.model('Image', imagesSchema);