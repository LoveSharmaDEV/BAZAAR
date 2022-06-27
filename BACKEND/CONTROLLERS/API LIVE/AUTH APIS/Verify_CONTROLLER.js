const User = require('../../../MODELS/index').User;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.Verify_CONTROLLER = async (req,res)=>{
    try{
        const userintoken = await jwt.verify(req.body.accessToken, process.env.ACCESS_KEY);
        const user = await User.findById(userintoken._id);
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