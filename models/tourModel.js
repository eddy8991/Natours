const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,"A trour must have a name"],
      unique:true
    },
    rating:{
      type:Number,
      default:4.5
    },
    price:{
      type:Number,
      required:[true,'A tour must indicate a price']
    }
  })
  
  const Tour = mongoose.model('Tour', tourSchema);
  
  module.exports = Tour;