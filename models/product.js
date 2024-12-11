const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      index:true
        },
    price: {
        type: Number,
        required: true
    },
    description:{type:String},
    image:{type:String}  
  });

// productSchema.index({name:1})
module.exports = mongoose.model('product', productSchema);