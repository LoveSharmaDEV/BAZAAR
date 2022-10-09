const User = require('../../../MODELS/index').User;
const Token = require('../../../MODELS/index').Token;
const jwt = require('jsonwebtoken');
const {v4:uuidv4} = require('uuid');


module.exports.GOOGLEAUTHSUCCESS_API__CONTROLLER = async (req,res)=>{
    try{
        if(req.user){

            let user = await User.findOne({email:req.user.email,SocialAuth:true,SocialAuthID:req.user.id});

            if(!user)
                {
                    user = await User.create(
                    {
                        username:req.user.displayName,
                        email: req.user.email,
                        password: uuidv4(),
                        role:'CUSTOMER',
                        contact:0,
                        SocialAuth:true,
                        SocialAuthID:req.user.id
                    })
                }

            const accessToken = await jwt.sign({USER_ID:user._id}, process.env.ACCESS_KEY, {expiresIn:"1m"});
            const refreshToken = await jwt.sign({USER_ID:user._id}, process.env.REFRESH_KEY,{expiresIn:"7d"});
            await Token.create({token:refreshToken});

            return res.status(200).json(
                {
                    errCode:'SUCCESS',
                    accessToken,
                    refreshToken,
                    user
                }
            )
        } 
        
        return res.status(200).json({
            message:'NOT AUTHORIZED',
            errCode:'FAILURE'
        })

    }
    catch(e){

        return res.status(200).json({
            message:`INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}

module.exports.FACEBOOKAUTHSUCCESS_API__CONTROLLER = async (req,res)=>{
    try{
        
        if(req.user){
            let user = await User.findOne({email:req.user.email,SocialAuth:true,SocialAuthID:req.user.id});
            if(!user) user = await User.findOne({username:req.user.displayName,SocialAuth:true,SocialAuthID:req.user.id});

            if(!user)
                {
                    user = await User.create(
                    {
                        username:req.user.displayName,
                        email: req.user.email,
                        password: uuidv4(),
                        role:'CUSTOMER',
                        contact:0,
                        SocialAuth:true,
                        SocialAuthID:req.user.id
                    })
                }
            const accessToken = await jwt.sign({USER_ID:user._id}, process.env.ACCESS_KEY, {expiresIn:"1m"});
            const refreshToken = await jwt.sign({USER_ID:user._id}, process.env.REFRESH_KEY,{expiresIn:"7d"});
            await Token.create({token:refreshToken});

            return res.status(200).json(
                {
                    errCode:'SUCCESS',
                    accessToken,
                    refreshToken,
                    user
                }
            )
        } 
        
        return res.status(200).json({
            message:'NOT AUTHORIZED',
            errCode:'FAILURE'
        })

    }
    catch(e){

        return res.status(200).json({
            message:`INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}

module.exports.GITHUBAUTHSUCCESS_API__CONTROLLER = async (req,res)=>{
    try{

        if(req.user){
            let user = await User.findOne({email:req.user.email,SocialAuth:true,SocialAuthID:req.user.id});
            if(!user) user = await User.findOne({username:req.user.displayName,SocialAuth:true,SocialAuthID:req.user.id});

            if(!user)
                {
                    user = await User.create(
                    {
                        username:req.user.displayName,
                        email: req.user.email,
                        password: uuidv4(),
                        role:'CUSTOMER',
                        contact:0,
                        SocialAuth:true,
                        SocialAuthID:req.user.id
                    })
                }
            const accessToken = await jwt.sign({USER_ID:user._id}, process.env.ACCESS_KEY, {expiresIn:"1m"});
            const refreshToken = await jwt.sign({USER_ID:user._id}, process.env.REFRESH_KEY,{expiresIn:"7d"});
            await Token.create({token:refreshToken});

            return res.status(200).json(
                {
                    errCode:'SUCCESS',
                    accessToken,
                    refreshToken,
                    user
                }
            )
        } 
        
        return res.status(200).json({
            message:'NOT AUTHORIZED',
            errCode:'FAILURE'
        })

    }
    catch(e){

        return res.status(200).json({
            message:`INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}

module.exports.AMAZONAUTHSUCCESS_API__CONTROLLER = async (req,res)=>{
    try{
        if(req.user){
            let user = await User.findOne({email:req.user.email,SocialAuth:true,SocialAuthID:req.user.id});
            if(!user) user = await User.findOne({username:req.user.displayName,SocialAuth:true,SocialAuthID:req.user.id});

            if(!user)
                {
                    user = await User.create(
                    {
                        username:req.user.displayName,
                        email: req.user.email,
                        password: uuidv4(),
                        role:'CUSTOMER',
                        contact:0,
                        SocialAuth:true,
                        SocialAuthID:req.user.id
                    })
                }
            const accessToken = await jwt.sign({USER_ID:user._id}, process.env.ACCESS_KEY, {expiresIn:"1m"});
            const refreshToken = await jwt.sign({USER_ID:user._id}, process.env.REFRESH_KEY,{expiresIn:"7d"});
            await Token.create({token:refreshToken});

            return res.status(200).json(
                {
                    errCode:'SUCCESS',
                    accessToken,
                    refreshToken,
                    user
                }
            )
        } 
        
        return res.status(200).json({
            message:'NOT AUTHORIZED',
            errCode:'FAILURE'
        })
    }
    catch(e){

        return res.status(200).json({
            message:`INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}