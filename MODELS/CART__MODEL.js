/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    productImage:[
        {
            type:String
        }
    ],
    color:{
        type:String
    },
    size:{
        type:String,
        enum:['SMALL','MEDIUM','LARGE','XLARGE']
    },
    Quantity:{
        type:Number
    }
})

/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model('Cart',cartSchema);