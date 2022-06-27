const  Comment = require('../../../MODELS/index').Comment

module.exports.ToggleLikeComment_Controller = async (req,res)=>{
    try{
        const comment = await Comment.findById(req.body.CommentId);
        if(!comment) return res.status(200).json({
            message:'Comment Not Found',
            errCode:'FAILURE'
        }) 
        if(req.body.action==='like'){
            await Comment.findByIdAndUpdate(req.body.CommentId,{$push:{like:req.user._id}})
        }
        else{
            await Comment.findByIdAndUpdate(req.body.CommentId,{$pull:{like:req.user._id}})
        }
        return res.status(200).json({
            message:'LIKE TOGGLED',
            errCode:'SUCCESS'
        }) 
    }
    catch(e){
        return res.status(200).json({
            message:`Internal Server Error ${e.message}`,
            errCode:'FAILURE'
        }) 
    }

}