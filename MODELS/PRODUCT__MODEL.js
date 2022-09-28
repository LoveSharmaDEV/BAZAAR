/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
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
                default:''
            }
        }
    ],
    ProductDescription:{
        type:String,
        trim: true
    },
    ProductPrice:{
        type:Number,
        required: true
    },
    ProductPublish:{ //Publish will define whether to show product in Ecom Store or not
        type:Boolean,
        default:false
    },
    ProductQuantity:{
        type:Number,
        default:0
    },
    ProductUnit:[{
        type:String,
        enum:['PCS','KG','LTR'],
        default:'PCS'
    }],
    ProductSize:[
        {
        type:String,
        enum:['SMALL','MEDIUM','LARGE','XLARGE'],
        default:'PCS'
    }
],
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
    isColorAvailable:{
        type:Boolean,
        default:false
    },
    isSizeAvailable:{
        type:Boolean,
        default:false
    },
    toBeSoldIn:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    },
});

/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model("Product",productSchema);