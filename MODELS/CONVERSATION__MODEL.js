/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const ConversationSchema = new mongoose.Schema({
    conversationID:{
        type:String,
        unique:true,
        required:true
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
},{timestamps:true})


/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model('Conversation', ConversationSchema)