const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    conversationID:{
        type:String,
        unique:true,
        required:true
    },
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
},{timestamps:true})

ConversationSchema.virtual('UserData').get(function(){
    return this.conversationID.split('#')[0];
});

ConversationSchema.virtual('StoreData').get(function(){
    return this.conversationID.split('#')[1];
})

module.exports = mongoose.model('Conversation', ConversationSchema)