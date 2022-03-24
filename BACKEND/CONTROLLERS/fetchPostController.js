const Store  = require("../MODELS/index").Store;
const Post = require('../MODELS/index').Post;


module.exports.fetchPostController = async (req,res)=>{

    try{
        const Stores = await Store.find({_id:{$in:req.user.following}});
        const Users = Stores.map((store)=>{
                return store.owner
        });
        const Posts = await Post.find({user:{$in:Users}}).sort({createdAt:-1})
        return res.status(200).json(
            {
                message:"Post fetched Successfully",
                errCode:"SUCCESS",
                data: Posts
            }
        )
    }catch(e){
        return res.status(200).json(
            {
                message:`Post not fetched ${e.message}`,
                errCode:"FAILURE"
            }
            )

    }



}