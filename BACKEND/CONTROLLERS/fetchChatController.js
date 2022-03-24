const Conversation = require('../MODELS/index').Conversation;
const Store = require('../MODELS/index').Store;

module.exports.fetchChatController = async(req,res)=>{
    let conversations=[];

    try{
        if(req.user.role==='SELLER'){
            const store = await Store.findOne({owner:req.user._id});
            conversations = await Conversation.find({StoreData:store._id});
        }
        if(req.user.role==='CUSTOMER'){
            conversations = await Conversation.find({UserData:req.user._id});
        }

        return res.status(200).json({
            message:'Conversation fetched successfully',
            errCode:'SUCCESS',
            data: conversations
        })
    }
    catch(e){
        return res.status(200).json({
            message:`Conversation not fetched ${e}`,
            errCode:'FAILURE'
        })
    }
}