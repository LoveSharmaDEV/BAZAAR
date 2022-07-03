
const Product = require('../../../MODELS/index').Product 
const Store = require('../../../MODELS/index').Store

module.exports.StoreProductUpload_CONTROLLER = async (req, res)=>{
    try{
        const store = await Store.findOne({owner:req.user._id});
        if(!store)
        {
            return res.status(200).json({
                message:'Store for this user does not exist',
                errCode:'FAILURE'
            })
        }
        
        const product = await Product.create({
            ProductName: req.body.ProductName,
            ProductPrice:req.body.ProductPrice,
            ProductPublish: false,
            ProductQuantity: req.body.ProductQuantity,
            ProductDescription: req.body.ProductDescription,
            ProductDiscount: req.body.ProductDiscount,
            ProductDiscountedPrice: req.body.ProductDiscountedPrice,
            hashtag: Array.isArray(req.body.HashTags)?req.body.HashTags:[req.body.HashtTags],
            ProductImage: req.files.map(file=>{return {path:file.filename}}),
            user:req.user._id,
            store: store._id
        })

        if(!product)
        {
            return res.status(200).json({
                message:'Product Uploading failed',
                errCode:'FAILURE'
            })
        }

        return res.status(200).json({
            message:'Product Successfully Uploaded',
            errCode:'SUCCESS'
        })
    }
    catch(e)
    {
        return res.status(200).json({
            message:`Product Uploading failed ${e.message}`,
            errCode:'FAILURE'
        })
    }

}

module.exports.StoreProductFetch_CONTROLLER = async (req,res)=>{

    try{
        const products = await Product.find({user:req.user._id});
        if(products.length==0)
        return res.status(200).json({
            message:`Product Fetching failed`,
            errCode:'FAILURE'
        })

        return res.status(200).json({
            message:`Product Fetching Successfull`,
            errCode:'SUCCESS',
            products
        })
    }   
    catch(e)
    {
        return res.status(200).json({
            message:`Product Fetching failed ${e.message}`,
            errCode:'FAILURE'
        })
    }

}

module.exports.StoreProductDelete_CONTROLLER = async (req,res) =>{
    try{
        const product = await Product.deleteOne({_id:req.body.productID});
        if(product) return res.status(200).json({
            message:"Product removed successfully",
            errCode:'SUCCESS'
        })

        return res.status(200).json({
            message:"Product removing failed",
            errCode:'FAILURE'
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