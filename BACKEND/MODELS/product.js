const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    ProductName:{
        type:String,
        trim:true,
        required:true
    },

    ProductImage:[
        {
            path:{
                type:String,
                required:true
            },
            color:{
                type:String,
                required:true,
                default:'None'
            }
        }
    ],

    ProductPrice:{
        type:Number,
        required: true
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
        type:String
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