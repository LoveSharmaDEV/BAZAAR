const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    ProductName:{
        type:String,
        trim:true,
        required:true
    },

    ProductImage:{
        type: Array,
        required:true
    },
    ProductPrice:{
        type:Number,
        required: true
    },
    ProductColor:{
        type:Array
    }
    ,
    ProductPublish:{
        type:Boolean,
        default:false
    },
    ProductQuantity:{
        type:Number,
        default:0
    },
    ProductUnit:{
        type:String,
        enum:["Pcs","Litre","Kg","Unit"],
    },
    ProductDescription:{
        type:String,
        trim: true
    },
    ProductDiscount:{
        type:Number
    },
    ProductDiscountedPrice:{
        type:Number,
    },
    hashtag:[{
        type:String,
        trim:true
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    },
});

module.exports = mongoose.model("Product",productSchema);