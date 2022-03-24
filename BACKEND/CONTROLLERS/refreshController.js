// IMPORT DEPENDENCIES
const User = require('../MODELS/index').User;
const jwt = require('jsonwebtoken');
const Token = require('../MODELS/index').Token
require('dotenv').config();

module.exports.refreshController = async (req,res)=>{
    try{
        let token = await Token.findOne({token:req.body.refreshToken});
        if(!token) return res.status(200).json({
            message: "REFRESH TOKEN DOESN'T EXISTS",
            errCode: "UNAUTHORIZED"
        })
        let user = await jwt.verify(token.token, process.env.REFRESH_KEY);
        const userLatest = await User.findById(user._id);
        let accessToken = await jwt.sign(userLatest.toJSON(), process.env.ACCESS_KEY,{expiresIn:"1m"});
        return res.status(200).json({
            message:"ACCESS TOKEN REGENERATED",
            errCode: "SUCCESS",
            accessToken,
            user:userLatest
        })
    }
    catch(e){
        await Token.deleteOne({token:req.body.refreshToken})
        return res.status(200).json({
            message:`REFRESH TOKEN VALIDITY FAILED ${e.message}`,
            errCode: `UNAUTHORIZED`,
        })
    }
}