const Conversation = require('../MODELS/index').Conversation;
module.exports.chatInitController = async(req,res)=>{

    try{
        const conversation = await Conversation.create({
            conversationID:`${req.user._id}#${req.body.storeId}`
        })
    
        res.status(200).json({
            message:'Conversation created',
            errCode:'SUCCESS',
            data:conversation
        })

    }
    catch(e){
        res.status(200).json({
            message:'Conversation creation failed',
            errCode:'FAILURE'
        })
    }

}