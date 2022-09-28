const jwt = require('jsonwebtoken');
const User = require('../../../MODELS/index').User;
const Token = require('../../../MODELS/index').Token;
const Store = require('../../../MODELS/index').Store;
require('dotenv').config();


/* -----------> LOGIN API CONTROLLER <------------- */
module.exports.LOGIN_API__CONTROLLER = async (req,res) =>
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

        const accessToken = await jwt.sign({USER_ID:user._id}, process.env.ACCESS_KEY, {expiresIn:"1m"});
        const refreshToken = await jwt.sign({USER_ID:user._id}, process.env.REFRESH_KEY,{expiresIn:"7d"});

        /* ---> STORING REFRESH TOKEN IN DB <--- */
        const t= await Token.create({token:refreshToken});
        /* ---> STORING REFRESH TOKEN IN DB <--- */
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
            errCode:`INTERNAL SERVER ERROR ${e}`
        })
    }
}
/* -----------> LOGIN API CONTROLLER <------------- */


/* -----------> REFRESH API CONTROLLER <------------- */
module.exports.REFRESH_API__CONTROLLER = async (req,res)=>{
    try{
            
            let token = await Token.findOne({token:req.body.refreshToken});
            if(!token) return res.status(200).json({
                message: "REFRESH TOKEN DOESN'T EXISTS",
                errCode: "UNAUTHORIZED"
            })
            let userID = await jwt.verify(token.token, process.env.REFRESH_KEY);
            const user = await User.findById(userID.USER_ID);
            let accessToken = await jwt.sign({USER_ID:userID.USER_ID}, process.env.ACCESS_KEY,{expiresIn:"1m"});
            return res.status(200).json({
                message:"ACCESS TOKEN REGENERATED",
                errCode: "SUCCESS",
                accessToken,
                user
            })
        }
    catch(e)
        {
            await Token.deleteOne({token:req.body.refreshToken})
            return res.status(200).json({
                message:`REFRESH TOKEN VALIDITY FAILED ${e.message}`,
                errCode: `UNAUTHORIZED`,
            })
        }
}
/* -----------> REFRESH API CONTROLLER <------------- */

/* -----------> SIGNIN API CONTROLLER <------------- */
module.exports.SIGNIN_API__CONTROLLER = async (req,res)=>{
    
    try{
        if(req.body.password != req.body.confirmpassword)
        {
            return res.status(200).json({
                message: "PASSWORD MISMATCH",
                errCode: "PASSWORDCHECK"
            });
        }
        
        let user = await User.findOne(
            {
                email: req.body.email
            }
        )
        if(user) return res.status(200).json(
            {
                message: "EMAIL ALREADY EXISTS",
                errCode: "USERALREADYEXISTS"
            }
        );
        user = await User.findOne(
            {
                username: req.body.username
            }
        )
        if(user) return res.status(200).json({
            message: "USERNAME ALREADY EXISTS",
            errCode: "USERALREADYEXISTS"
        });


        if(req.body.role==='SELLER')
        {
            let store = await Store.findOne({"storeName":req.body?.storename});
            if(store) return res.status(200).json({
                message: "STORE ALREADY EXISTS",
                errCode: "STOREALREADYEXISTS"
            })
        }
        
        /* -------> CREATE USER <---------- */
        user = await User.create({
            "username":req.body.username,
            "password": req.body.password,
            "email": req.body.email,
            "contact": req.body.contact,
            "DOB": req.body.DOB,
            "role":req.body.role
        })
        /* -------> CREATE USER <---------- */

        /* -------> CREATE STORE <---------- */
        if(req.body.role === 'SELLER' && req.body.storeName){
            store = await Store.create({
                "storeName": req.body?.storeName,
                "owner": user._id
            })    

        user.following.push(store._id);
        user.save();
        }
        /* -------> CREATE STORE <---------- */

        return res.status(200).json({
            message:"SIGN UP SUCCESSFULL!!",
            errCode:"USERCREATED"
        })
    }
    catch(e){
        return res.status(200).json({
            message:e.message,
            errCode:`ERROR OCCURED ${e}`
        })
    }

}
/* -----------> SIGNIN API CONTROLLER <------------- */



/* -----------> VERIFY API CONTROLLER <------------- */
module.exports.VERIFY_API__CONTROLLER = async (req,res)=>{
    try{
        const userintoken = await jwt.verify(req.body.accessToken, process.env.ACCESS_KEY);
        const user = await User.findById(userintoken.USER_ID);
        return res.status(200).json({
            response: "SUCCESS",
            user
        })
    }
    catch(e){
        return res.status(200).json({
            response: "FAILURE",
            message:e.message
        })
    }
}