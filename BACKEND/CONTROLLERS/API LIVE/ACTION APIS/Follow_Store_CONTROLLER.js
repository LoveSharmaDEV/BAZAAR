const User = require('../../../MODELS/index').User;

module.exports.Follow_Store_Controller = async (req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if(user){
            user.following.push(req.body.storeId)
            user.save();
        }
        return res.status(200).json({
            message: "New follow added",
            errCode:"SUCCESS"
        })
    }
    catch(e){
        return res.status(200).json({
            message: `Error in adding follow ${e.message}`,
            errCode:"FAILURE"
        })

    }

}