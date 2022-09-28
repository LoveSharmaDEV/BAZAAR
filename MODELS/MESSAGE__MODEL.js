/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const MessageSchema = new mongoose.Schema({
    From:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'User' 
    },
    To:{
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'User'
    },
    message:{
        type:String,
        trim:true,
    }
},{timestamps:true})


/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model('Message',MessageSchema)