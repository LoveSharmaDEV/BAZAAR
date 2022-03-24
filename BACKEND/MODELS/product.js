const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        trim:true,
        required:true
    },
    productDescription:{
        type:String,
        trim:true,
        required:true,
    },
    productQty:{
        type:Number,
        default:0
    },
    productUnit:{
        type:String,
        enum:["Pcs","Litre","Kg","Unit"],
        required:true
    },
    productEnabled:{
        type:Boolean
    }
});

module.exports = mongoose.model("Product",productSchema);