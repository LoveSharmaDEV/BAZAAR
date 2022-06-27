// IMPORT DEPENDENCIES
const jwt = require('jsonwebtoken');
const User = require('../../../MODELS/index').User;
const Token = require('../../../MODELS/index').Token;
require('dotenv').config();

module.exports.Login_CONTROLLER = async (req,res) =>
{
    try
    {
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(200).json({
            message:"USER DOESN'T EXIST",
            errCode:"USERNOTFOUND"
        })
        if(user.password!=req.body.password) return res.status(200).json({
            message:"USERNAME OR PASSWORD IS INCORRECT",
            errCode:"WRONGPASSWORD"
        })

        const accessToken = await jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {expiresIn:"1m"});
        const refreshToken = await jwt.sign(user.toJSON(), process.env.REFRESH_KEY,{expiresIn:"7d"});

        await Token.create({token:refreshToken});

        return res.status(200).json({
            message:"LOGIN SUCCESSFULL!!",
            errCode:"TOKENSGENERATED",
            accessToken,
            refreshToken,
            user
        })
    }
    catch(e)
    {
        return res.status(500).json({
            message:e.message,
            errCode:`ERROR OCCURED ${e}`
        })
    }
}