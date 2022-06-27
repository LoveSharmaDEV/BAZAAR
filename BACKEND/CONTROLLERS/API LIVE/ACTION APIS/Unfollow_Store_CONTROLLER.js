const User = require('../../../MODELS/index').User;

module.exports.Unfollow_Store_Controller = async (req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if(user){
            user.following = user.following.filter((f)=>{
                return f.toString()!==req.body.storeId
            })
            user.save();
        }
        return res.status(200).json({
            message: "follow removed",
            errCode:"SUCCESS"
        })
    }
    catch(e){
        return res.status(200).json({
            message: `Error in removing follow ${e.message}`,
            errCode:"FAILURE"
        })

    }

}