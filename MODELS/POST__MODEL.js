/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const postSchema = new  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    },
    postPic:[
        {
        type:String,
        trim:true
        }
    ],
    postName:{
        type:String,
        trim:true,
        unique:false,
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


/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model("Post", postSchema);
