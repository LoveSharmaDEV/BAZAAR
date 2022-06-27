// IMPORT DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const postSchema = new  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    },
    postPic:{
        type:String,
        default:'../UTILITIES/UPLOADED_POST_PICS/default.png',
        trim:true
    },
    postName:{
        type:String,
        unique: true,
        trim:true,
        required:true
    },
    postDescription:{
        type: String,
        trim:true,
        required:true
    },
    postPrice:{
        type: Number,
        trim:true,
        required:true 
   },
   like:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
   }]
},{
    timestamps:true
})


// EXPORT MODEL
module.exports = mongoose.model("Post", postSchema);
