const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'OnModel' 
    },
    To:{
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    onModel:{
        type:String,
        enum:['User','Store']
    },
    message:{
        type:String,
        trim:true,
    }
},{timestamps:true})

module.exports = mongoose.model('Message',MessageSchema)