const Conversation = require('../../../MODELS/index').Conversation;
const Message = require('../../../MODELS/index').Message;

module.exports.FetchChatMessage_Controller = async(req,res)=>{
    try{
        const conversation = await Conversation.findOne({conversationID: req.body.conversationID});
        const message = await Message.find({_id:{$in:conversation.message}})
        if(conversation){
            return res.status(200).json({
                message:"Conversation fetched",
                errCode:"SUCCESS",
                message:message
            })
        
        }
        return res.status(200).json({
            message:"Conversation doesn't exists",
            errCode:"FAILURE",
        })
    }
    catch(e){
        return res.status(200).json({
            message:`ERROR OCCURED IN FetchChatMessage_CONTROLLER ${e.message}`,
            errCode:"FAILURE",
        })
    }
}