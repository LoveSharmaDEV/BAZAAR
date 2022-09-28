// IMPORT DEPENDIENCIES
const User = require('../MODELS/index').User
const jwt= require('jsonwebtoken');
require('dotenv').config();

module.exports.authenticator =  async (req,res,next)=>{
    try{
        const token = req.headers['authorization'].split(' ')[1]; 
        const userinToken = await jwt.verify(token, process.env.ACCESS_KEY);
        const user = await User.findById(userinToken.USER_ID);
        req.user = user;
        return next();
    }catch(e){
        return res.status(200).json({
            message:`Access Token Verification Failed----- ${e.message}`,
            errCode:"UNAUTHORIZED"
        });
    }
}