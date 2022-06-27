const Comment = require('../../../MODELS/index').Comment;
const User = require('../../../MODELS/index').User;

module.exports.CommentPost_CONTROLLER = async (req,res)=>{
    try{
        const comment = await Comment.create({
            post: req.body.PostId,
            user: req.user._id,
            comment: req.body.comment
        })

        if(!comment) return res.status(200).json({
            message:'Comment not created',
            errCode:'FAILURE'
        })
        return res.status(200).json({
            message:'Comment created',
            errCode:'SUCCESS'
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

module.exports.CommentFetch_CONTROLLER = async (req,res)=>{
    try{
        let comments = await Comment.find({post:req.body.PostId});
        comments = comments.map(async (cmnt)=>{
            const user = await User.findById(cmnt.user);
            return{
                _id:cmnt._id,
                user,
                comment:cmnt.comment,
                like:cmnt.like
            }
        })

        comments = await Promise.all(comments);
        return res.status(200).json({
            message:'Comment Fetched',
            errCode:'SUCCESS',
            comments
        })
    }
    catch(e){
        return res.status(200).json({
            message:`INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}