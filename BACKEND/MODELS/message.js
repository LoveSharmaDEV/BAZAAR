const mongoose = require('mongoose');

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

module.exports = mongoose.model('Message',MessageSchema)