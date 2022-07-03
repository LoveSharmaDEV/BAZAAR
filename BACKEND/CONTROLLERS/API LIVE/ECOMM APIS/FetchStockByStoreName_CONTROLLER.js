const Product = require('../../../MODELS/index').Product;
const Store = require('../../../MODELS/index').Store;

module.exports.FetchStockByStoreName_CONTROLLER = async (req,res)=>{
    try{
        const store = await Store.findOne({storeName:req.params.storeName});
        if(!store) return res.status(200).json({
            message:'Store Not Found',
            errCode:'FAILURE'
        })
        const product = await Product.find({store:store._id});
        return res.status(200).json({
            message:'Stock fetched',
            errCode:'SUCCESS',
            product,
            store
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