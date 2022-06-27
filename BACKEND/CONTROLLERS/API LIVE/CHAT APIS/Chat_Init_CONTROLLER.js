const Conversation = require('../../../MODELS/index').Conversation;
const { v4: uuidv4 } = require('uuid');

module.exports.Chat_Init_Controller = async(req,res)=>{
    try{
        const conversation = Conversation.create({
            conversationID:uuidv4(),
            participants:[req.user._id,req.body.toUser]
        })

        if(conversation){
            return res.status(200).json({
                message:"Conversation created",
                errCode:"SUCCESS",
                conversation  
            })
        }

        return res.status(200).json({
            message:"Conversation not created",
            errCode:"FAILURE",
        })

    }
    catch(e){
        return res.status(200).json({
            message:`ERROR OCCURED IN ChatInit_CONTROLLER ${e.message}`,
            errCode:"FAILURE",
        })
    }

}