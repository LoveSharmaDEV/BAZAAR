
/* ------> IMPORT DEPENDENCIES <------- */
const Post = require('../../../MODELS/index').Post;
const Store = require('../../../MODELS/index').Store;
const  Comment = require('../../../MODELS/index').Comment;
const User = require('../../../MODELS/index').User;
/* ------> IMPORT DEPENDENCIES <------- */


/* -------------> UPLOAD POST CONTROLLER <----------- */
module.exports.UPLOADPOST_API__CONTROLLER = async (req,res)=>{
    try{
        const store = await Store.findOne({owner:req.user._id});

        if(store){
            let post = await Post.create({
                user:req.user._id,
                store: store._id,
                postPic: req.files.map((file)=>file.filename),
                postName: req.body.postName,
                postDescription: req.body.postDescription,
                postPrice: req.body.postPrice,
            })

            if(post){
                
                post.store = store;
                post.user=req.user;
    
                return res.status(200).json({
                    message:"Post Uploaded",
                    errCode:"SUCCESS",
                    post
                })
            }

            return res.status(200).json({
                message:`Post Not Uploaded`,
                errCode:"FAILURE"
            })

        }
        return res.status(200).json({
            message:`Post Not Uploaded`,
            errCode:"FAILURE"
        })
    }
    catch(e){
        return res.status(200).json({
            message:`Post Not Uploaded ${e.message}`,
            errCode:"FAILURE"
        })
    }
}
/* -------------> UPLOAD POST CONTROLLER <----------- */

/* -------------> DELETE POST CONTROLLER <----------- */
module.exports.DELETEPOST_API__CONTROLLER = async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.body.PostID);
        return res.status(200).json({
            message:`Post Deletion Successfull`,
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
/* -------------> DELETE POST CONTROLLER <----------- */


/* -------------->TOGGLE LIKE ON POST CONTROLLER <------------- */
module.exports.TOGGLELIKEONPOST_API__CONTROLLER = async (req,res)=>{

    try{
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
/* -------------->TOGGLE LIKE ON POST CONTROLLER <------------- */


/* -------------->TOGGLE LIKE ON COMMENT CONTROLLER <------------- */
module.exports.TOGGLELIKEONCOMMENT_API__CONTROLLER = async (req,res)=>{
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
/* -------------->TOGGLE LIKE ON COMMENT CONTROLLER <------------- */

/* ---------------->  FETCH FEEDS CONTROLLER <--------------------- */
module.exports.FETCHFEEDS_API__CONTROLLER = async (req,res)=>{

    try{
        const Stores = await Store.find({_id:{$in:req.user.following}});
        const Users = Stores.map((store)=>{
                return store.owner
        });
        const Posts = await Post.find({user:{$in:Users}}).sort({createdAt:-1}).populate('user').populate('store')
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
/* ---------------->  FETCH FEEDS CONTROLLER <--------------------- */


/* ----------------->COMMENT CREATE CONTROLLER <------------------ */
module.exports.COMMENTPOST_API__CONTROLLER = async (req,res)=>{
    try{
        const comment = await Comment.create({
            post: req.body.PostId,
            user: req.user._id,
            comment: req.body.Comment
        })

        if(!comment) return res.status(200).json({
            message:'Comment not created',
            errCode:'FAILURE'
        })
        return res.status(200).json({
            message:'Comment created',
            errCode:'SUCCESS',
            comment
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
/* ----------------->COMMENT CREATE CONTROLLER <------------------ */

/*-------------------> COMMENT FETCH CONTROLLER <----------------- */
module.exports.COMMENTFETCH_API__CONTROLLER = async (req,res)=>{
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
/*-------------------> COMMENT FETCH CONTROLLER <----------------- */
