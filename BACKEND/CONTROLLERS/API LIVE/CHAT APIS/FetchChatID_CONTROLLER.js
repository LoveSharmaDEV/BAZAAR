const Conversation = require('../../../MODELS/index').Conversation;

module.exports.FetchChatID_CONTROLLER = async(req,res) => {
    try{
        const conversation = await Conversation.findOne({
            participants:{"$in":[req.user._id, req.body.toUser]}
        });

        if(conversation){
            return res.status(200).json({
                message: "Conversation exists",
                errCode: "SUCCESS",
                conversationID:conversation.conversationID
            })
        }
        return res.status(200).json({
            message: "Conversation doesn't exists",
            errCode: "FAILURE"
        })
    }
    catch(e){
        return res.status(200).json({
            message: `Error Occured in FetchChatID controller ${e.message}`,
            errCode: "FAILURE"
        })
    }
}