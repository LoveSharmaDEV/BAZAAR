const  Post = require('../../../MODELS/index').Post

module.exports.ToggleLikePost_Controller = async (req,res)=>{

    try{
        console.log(req.body)
        const post = await Post.findById(req.body.PostId);
        if(!post) return res.status(200).json({
            message:'Post Not Found',
            errCode:'FAILURE'
        }) 
        if(req.body.action==='like'){
            await Post.findByIdAndUpdate(req.body.PostId,{$push:{like:req.user._id}})
        }
        else{
            await Post.findByIdAndUpdate(req.body.PostId,{$pull:{like:req.user._id}})
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