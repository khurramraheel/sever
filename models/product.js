// import mongoose from "mongoose";
let mongoose =  require('mongoose')


module.exports = mongoose.model('product', {
    name:String,
    owner:{
        ref:"user",
        type:mongoose.SchemaTypes.ObjectId
    },
    price:Number,
    description:String,
    src: String,
    preview: String,
    qty:Number
});
