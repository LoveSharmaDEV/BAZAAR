const User = require('../../../MODELS/index').User;
const Store = require('../../../MODELS/index').Store;

module.exports.Fetch_Chat_Highlight_Header_CONTROLLER = async (req,res)=>{
    try
    {
       const toUser = await User.findById(req.body.toUser);
        if(toUser)
        {
            if(toUser.role==='SELLER')
            {
                const toStore = await Store.findOne({owner:toUser._id});
                return res.status(200).json({
                    message: "CHAT HEADER CREATED SUCCESSFULLY",
                    errCode: "SUCCESS",
                    data:{
                        chatHeader: toStore.storeName,
                        chatHeaderImage: toUser.profilepic,
                        toUser: toUser,
                        toStore: toStore
                    }
                });
            }
            return res.status(200).json({
                message: "CHAT HEADER CREATED SUCCESSFULLY",
                errCode: "SUCCESS",
                data:{
                    chatHeader:toUser.username,
                    chatHeaderImage: toUser.profilepic,
                }
            });
        }
        return res.status(200).json({
            message: `CHAT HEADER NOT CREATED`,
            errCode: "FAILURE",
        });
    }
    catch(e)
    {
        return res.status(200).json({
            message: ` CHAT HEADER NOT CREATED ${e.message}`,
            errCode: "FAILURE",
        });
    }
}