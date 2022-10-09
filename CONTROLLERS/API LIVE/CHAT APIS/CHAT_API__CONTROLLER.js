const Conversation = require('../../../MODELS/index').Conversation;
const Message = require('../../../MODELS').Message;
const Store = require('../../../MODELS').Store;
const { v4: uuidv4 } = require('uuid');

/*-------------> CHAT INIT CONTROLLER <---------- */
module.exports.CHATINIT_API__CONTROLLER = async(req,res)=>{
    try{
        let conversation = await Conversation.findOne({participants:{$all:[req.user._id, req.body.ToUserID]}})
        .populate('message');
        
        if(!conversation) {
            conversation = await Conversation.create({
                conversationID:uuidv4(),
                participants:[req.user._id,req.body.ToUserID]
            })

            if(!conversation){
                return res.status(200).json({
                    message:`ERROR OCCURED IN CREATING CONVERSATION`,
                    errCode:"FAILURE",
                })
            }
        }

        return res.status(200).json({
            message:"Conversation created",
            errCode:"SUCCESS",
            conversation  
        })

    }
    catch(e){

        return res.status(200).json({
            message:`ERROR OCCURED IN CREATING CONVERSATION ${e.message}`,
            errCode:"FAILURE",
        })

    }
}
/*-------------> CHAT INIT CONTROLLER <--------------- */


/*------------> FETCH ALL CHATS CONTROLLER <------------- */
module.exports.FETCHALLCHATS_API__CONTROLLER = async (req,res)=>{  
    try{
        const conversations =  await Conversation.find({participants:{$all: req.user._id}})
        .populate('message')
        .populate('participants');

        return res.status(200).json({
            message:"Conversation Fetched",
            errCode:"SUCCESS",
            conversations:conversations
        })
    }
    catch(e){
        return res.status(200).json({
            message:`ERROR OCCURED IN FetchAllChats_CONTROLLER ${e.message}`,
            errCode:"FAILURE",
        })
    }
}
/*------------> FETCH ALL CHATS CONTROLLER <------------- */

/*------------> SAVE MESSAGE CONTROLLER <------------- */
module.exports.SAVEMESSAGE_API__CONTROLLER = async (req,res)=>{
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
            message:`ERROR OCCURED IN SAVING MESSAGE ${e.message}`,
            errCode:"FAILURE",
        })
    }
}
/*------------> SAVE MESSAGE CONTROLLER <------------- */

/*-----------> FETCH STORE <------------------------- */
module.exports.FETCH_STORE_API_CONTROLLER = async (req,res)=>{
    try{
        const store = await Store.findOne({owner:req.body.ToUserID});

        if(!store) return res.status(200).json({
            message:`STORE DOESN'T EXISTS ${e.message}`,
            errCode:"FAILURE",
        })

        return res.status(200).json({
            message:"STORE RETRIEVED SUCCESSFULLY",
            errCode:"SUCCESS",
            store
        })
        
    }
    catch(e){
        return res.status(200).json({
            message:`ERROR OCCURED IN FETCHING STORE ${e.message}`,
            errCode:"FAILURE",
        })
    }
}
/*-----------> FETCH STORE <------------------------- */