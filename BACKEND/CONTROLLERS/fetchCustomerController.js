const User = require('../MODELS/index').User;

module.exports.fetchCustomerController = async (req,res)=>{
    try{
        const user = await User.findById(req.body.customer_id);
        if(user){
            return res.status(200).json({
                message:'Customer Fetched Successfully',
                errCode:'SUCCESS',
                data:user
            })
        }
    }
    catch(e){

        return res.status(200).json({
            message:`Customer not fetched ${e.message}`,
            errCode:'FAILURE',
        })
    }
}