const Message = require('../../../MODELS/index').Message;
const Conversation = require('../../../MODELS/index').Conversation;
const mongoose = require('mongoose');

module.exports.Save_Message_CONTROLLER = async (req,res)=>{
    try{
        const message = await Message.create(req.body.message);
        const conversation = await Conversation.findOne({conversationID: req.body.conversationID});
        if(message && conversation){
            conversation.message.push(message._id);
            conversation.save();
            return res.status(200).json({
                message:"Message saved in the conversation",
                errCode:"SUCCESS",
            })
        }
        return res.status(200).json({
            message:"Message not saved in the conversation",
            errCode:"FAILURE",
        })
    }
    catch(e){
        return res.status(200).json({
            message:`ERROR OCCURED IN SaveMessage_CONTROLLER ${e.message}`,
            errCode:"FAILURE",
        })
    }
}