const Conversation = require('../../../MODELS/index').Conversation;

module.exports.Fetch_All_Chats_CONTROLLER = async (req,res)=>{  
    try{
        const conversations=  await Conversation.find({participants: {$all: req.user._id}}).populate('message');
        if(conversations.length!=0){
            return res.status(200).json({
                message:"Conversation Fetched",
                errCode:"SUCCESS",
                conversations:conversations
            })
        }

        return res.status(200).json({
            message:"Conversation not fetched",
            errCode:"FAILURE",
        })
    }
    catch(e){
        return res.status(200).json({
            message:`ERROR OCCURED IN FetchAllChats_CONTROLLER ${e.message}`,
            errCode:"FAILURE",
        })
    }

}