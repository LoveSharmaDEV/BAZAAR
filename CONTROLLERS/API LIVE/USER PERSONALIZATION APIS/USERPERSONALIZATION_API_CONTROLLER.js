const User = require('../../../MODELS/index').User;
const Store = require('../../../MODELS/index').Store;

module.exports.FETCHFOLLWERS_API__CONTROLLER = async (req,res)=>{
    try{
        const FollowersList = await Store.find({_id:{$in:req.user.following}});
        return res.status(200).json({
            message:'Followers Fetched Succesfully',
            errCode:'SUCCESS',
            FollowersList
        })
    }
    catch(e)
    {
        return res.status(200).json({
            message:`INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}


/*--------------------->FOLLOW STORE CONTROLLER <----------------- */
module.exports.FOLLOWSTORE_API__CONTROLLER = async (req,res)=>{
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
/*--------------------->FOLLOW STORE CONTROLLER <----------------- */

/*--------------------->UNFOLLOW STORE CONTROLLER <----------------- */
module.exports.UNFOLLOWSTORE_API__CONTROLLER = async (req,res)=>{
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
/*--------------------->UNFOLLOW STORE CONTROLLER <----------------- */
