const Store = require('../../../MODELS/index').Store;

module.exports.Search_Store_Controller = async (req,res)=>{
    try{
        if(req.body.key){
            const stores= await Store.find({storeName:{$regex:`${req.body.key}`,$options:'i'}});
            return res.status(200).json({
                message:'Stores fetched successfully',
                data:stores,
                errCode:"SUCCESS"
            })
        }
    }
    catch(e){
        return res.status(200).json({
            message:'Stores fetching failure',
            errCode:"FAILURE"
        })
    }
}