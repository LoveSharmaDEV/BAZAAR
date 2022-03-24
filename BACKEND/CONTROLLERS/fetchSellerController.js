const Store = require('../MODELS/index').Store;
module.exports.fetchSellerController = async (req,res)=>{

    try{
        const store = await Store.findById(req.seller_id);
        if(user){
            return res.status(200).json({
                message:'Seller Fetched Successfully',
                errCode:'SUCCESS',
                data:store
            })
        }
    }
    catch(e){

        return res.status(200).json({
            message:`Seller not fetched ${e.message}`,
            errCode:'FAILURE',
        })
    }
}