const Post = require('../MODELS/index').Post;
const Store = require('../MODELS/index').Store;
const path = require('path')


module.exports.uploadPostController = async (req,res)=>{
    try{
        const store = await Store.findOne({owner:req.user._id})
        const post = await Post.create({
            user:req.user._id,
            store: store._id,
            postPic: req.file.filename,
            postName: req.body.postName,
            postDescription: req.body.postDescription,
            postPrice: req.body.postPrice
        })
    
        return res.status(200).json({
            message:"Post Uploaded",
            errCode:"SUCCESS"
        })
    }
    catch(e){
        return res.status(200).json({
            message:`Post Not Uploaded ${e.message}`,
            errCode:"FAILURE"
        })
    }



}