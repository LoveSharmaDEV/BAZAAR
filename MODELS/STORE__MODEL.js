/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const storeSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    storeName: {
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    customers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    storePic:{
        type:String,
        trim:true
    },

}, {timestamps:true});


/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model("Store",storeSchema);
