const User = require('../../../MODELS/index').User;
const Store = require('../../../MODELS/index').Store;
const Follow = require('../../../MODELS/index').Follow;


/*--------------------->FETCH FOLLOWERS CONTROLLER <----------------- */

module.exports.FETCHFOLLWERS_API__CONTROLLER= async (req,res)=>{
    try{

        const follow = await Follow.findOne({USER:req.user._id});

        let FollowersList=[];
        
        if(follow){
            if(follow.FOLLOWING.length!==0) FollowersList = await Store.find({_id:{$in:follow.FOLLOWING}});
        }

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

/*--------------------->FETCH FOLLOWERS CONTROLLER <----------------- */

/*--------------------->FOLLOW STORE CONTROLLER <----------------- */

module.exports.FOLLOWSTORE_API__CONTROLLER = async (req,res)=>{
    try{

        let follow = await Follow.findOne({USER:req.user._id});
        
        if(follow){

            follow.FOLLOWING.push(req.body.storeId);

            await follow.save();

            return res.status(200).json({
                message: "NEW FOLLOWER ADDED",
                errCode:"SUCCESS",
                follow
            })

        }

        follow = await Follow.create({
            USER:req.user._id,
            FOLLOWING:[req.body.storeId]
        })

        if(follow){

            return res.status(200).json({
                message: "NEW FOLLOWER ADDED",
                errCode:"SUCCESS",
                follow
            })
        }

        return res.status(200).json({
            message: "ERROR IN ADDING FOLLOWER",
            errCode:"FAILURE"
        })
    }
    catch(e){
        return res.status(200).json({
            message: `ERROR IN ADDING FOLLOWER ${e.message}`,
            errCode:"FAILURE"
        })

    }
}

/*--------------------->FOLLOW STORE CONTROLLER <----------------- */

/*--------------------->UNFOLLOW STORE CONTROLLER <----------------- */

module.exports.UNFOLLOWSTORE_API__CONTROLLER = async (req,res)=>{
    try{
        
        let follow = await Follow.findOne({USER:req.user._id});

        if(follow){

            follow.FOLLOWING = follow.FOLLOWING.filter((f)=>{
                return f.toString()!==req.body.storeId
            })

            await follow.save();

            return res.status(200).json({
                message: "FOLLOWER REMOVED",
                errCode:"SUCCESS"
            })
        }

        return res.status(200).json({
            message: "FOLLOWER REMOVED",
            errCode:"SUCCESS"
        })
    }
    catch(e){
        return res.status(200).json({
            message: `ERROR IN REMOVING FOLLOWER ${e.message}`,
            errCode:"FAILURE"
        })

    }

}

/*--------------------->UNFOLLOW STORE CONTROLLER <----------------- */
