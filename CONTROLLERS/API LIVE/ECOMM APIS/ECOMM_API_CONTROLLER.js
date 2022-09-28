const Product = require('../../../MODELS/index').Product;
const Store = require('../../../MODELS/index').Store;
const Cart = require('../../../MODELS').Cart;
const User = require('../../../MODELS/').User

/* ---------------> FETCH STORE BY STOREID <--------------- */
module.exports.FETCHSTOREBYUSERID_API__CONTROLLER = async(req,res)=>{
    try{
        const store = await Store.findOne({owner:req.user._id});
        const products = await Product.find({user:req.user._id});   
        if(store)
        {
            return res.status(200).json({
                message:'Store fetched successfully',
                errCode:'SUCCESS',
                store,
                products
            })
        }

        return res.status(200).json({
            message:`Store doesn't exist`,
            errCode:'FAILURE'
        })
    }
    catch(e)
    {
        return res.status(200).json({
            message:`INTERNAL ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}
/* ---------------> FETCH STORE BY STOREID <--------------- */


/* ---------------> FETCH STOCK BY STORENAME <--------------- */
module.exports.FETCHSTOREBYSTORENAME_API__CONTROLLER = async (req,res)=>{
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
/* ---------------> FETCH STOCK BY STORENAME <--------------- */


/*--------------------> PRODUCT UPLOAD CONTAINER <----------------- */
module.exports.PRODUCTUPLOAD_API__CONTROLLER = async (req, res)=>{
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
            hashtag: req.body.hashtag,
            ProductImage: req.files.map((file)=>{ return {path:file.filename, color:''}}),
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
            errCode:'SUCCESS',
            product
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
/*--------------------> PRODUCT UPLOAD CONTAINER <----------------- */

/*--------------------> PRODUCT FETCH CONTAINER <----------------- */
module.exports.PRODUCTFETCH_API__CONTROLLER = async (req,res)=>{

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
/*--------------------> PRODUCT FETCH CONTAINER <----------------- */

/*--------------------> PRODUCT DELETE CONTAINER <----------------- */
module.exports.PRODUCTDELETE_API__CONTROLLER = async (req,res) =>{
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
/*--------------------> PRODUCT DELETE CONTAINER <----------------- */

/*--------------------> PRODUCT UPDATE CONTAINER <----------------- */
module.exports.PRODUCTUPDATE_API__CONTROLLER = async(req,res)=>{
    try{
        const opts = {new:true};
        let TempProductImage = [];
        if(req.body.ProductImage){

            req.body.ProductImage.forEach((product,key)=>{
                let i=0;
                if(JSON.parse(product).path instanceof Object){
                    TempProductImage[key]={
                        path:req.files[i].filename,
                        color:JSON.parse(product).color
                    
                    }
                    i++;
                }
                else
                {
                    TempProductImage[key]= JSON.parse(product)
                }
            })
        }

        const product = await Product.findOneAndUpdate({_id:req.body.ProductID},{
            ProductName: req.body.ProductName,
            ProductPrice: req.body.ProductPrice,
            ProductQuantity:req.body.ProductQuantity,
            ProductDiscount: req.body.ProductDiscount,
            ProductDiscountedPrice: req.body.ProductDiscountedPrice,
            ProductPublish: req.body.ProductPublish,
            ProductImage: TempProductImage,
            ProductDescription: req.body.ProductDescription,
            toBeSoldIn: req.body.UnitVisible,
            isSizeAvailable:req.body.SizeVisible,
            isColorAvailable:req.body.ColorVisible,
            ProductUnit:!req.body.ProductUnit?
                        []
                        :
                        req.body.ProductUnit,
            ProductSize:!req.body.ProductSize?
                        []
                        :
                        req.body.ProductSize,
            hashtag: !req.body.HashTags?
                        []
                        :
                        req.body.HashTags
        },opts)


        // const status = await Product.updateOne({_id:req.body.ProductID},{
        //    ProductImage: product.ProductImage.map((product,key)=>{ 
        //     return {path:product.path,color:JSON.parse(req.body.ProductImage[key]).color} })
        // })
        
        if(product) return res.status(200).json({
            message:"Product Updated Successfully",
            errCode:'SUCCESS',
            product
        })

        return res.status(200).json({
            message:"Product Updation Failed",
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
/*--------------------> PRODUCT UPDATE CONTAINER <----------------- */


/*--------------------->ADD PRODUCT TO CART CONTROLLER <----------------- */
module.exports.ADDPRODUCTTOCART_API__CONTROLLER = async(req,res)=>{
    try
    {
        const cart = await Cart.find({
            user:req.body.user,
            product:req.body.product._id,
            color: req.body.color,
            size: req.body.size
        })

        if(cart.length===0){
            Cart.create(req.body)
        }
        else{
            cart[0].Quantity+=1;
            cart[0].save();
           
        }

        return res.status(200).json({
            message:'Added to cart successfully',
            errCode:'SUCCESS'
        })
    }
    catch(e)
    {
        return res.status(200).json({
            message:'ERROR OCCURES',
            errCode:  `FAILURE ${e.message}`
        })
    }
}
/*--------------------->ADD PRODUCT TO CART CONTROLLER <----------------- */

/*--------------------->FETCH CART CONTROLLER <----------------- */
module.exports.FETCHCART_API__CONTROLLER = async (req,res)=>{
    try{
        let cartItems = await Cart.find({user:req.user._id}).populate('product')

        return res.status(200).json({
            message:'Cart Items Fetched SuccessFully',
            errCode:'SUCCESS',
            cartItems
        })


    }
    catch(e){
        return res.status(200).json({
            message:'ERROR OCCURES',
            errCode:  `FAILURE ${e.message}`
        })
    }
} 
/*--------------------->FETCH CART CONTROLLER <----------------- */

/*--------------------->DELETE FROM CART CONTROLLER <----------------- */
module.exports.DELETEFROMCART_API__CONTROLLER = async (req,res)=>{

    try{
        const cart = await Cart.findByIdAndDelete(req.body.cartID);
        if(cart)
        {
            return res.status(200).json({
                message:'Cart Item Deleted SuccessFully',
                errCode:'SUCCESS'
            })
        }

    }catch(e)
    {
        return res.status(200).json({
            message:'ERROR OCCURES',
            errCode:  `FAILURE ${e.message}`
        })
    }
}
/*--------------------->DELETE FROM CART CONTROLLER <----------------- */


/*--------------------->DEACTIVATE USER CONTROLLER <----------------- */
module.exports.DEACTIVATEUSER_API__CONTROLLER = async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.user._id);
        await Store.findOneAndDelete({owner:req.user._id});
        return res.status(200).json({
            message:`User Deleted`,
            errCode:'SUCCESS'
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
/*--------------------->DEACTIVATE USER CONTROLLER <----------------- */

/*--------------------->UPDATE USER CONTROLLER <----------------- */
module.exports.UPDATEUSER_API__CONTROLLER = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.user._id,{
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            contact:req.body.contact,
            DOB:req.body.DOB
        });
        

        if(!user) return res.status(200).json({
            message:'USER DOES NOT EXISTS',
            errCode:'FAILURE'
        })

        if(req.files.profilepicupload)
        {
            if(req.files.profilepicupload[0].fieldname==='profilepicupload'){
                await User.findByIdAndUpdate(req.user._id,{
                    profilepic:req.files.profilepicupload[0].filename
                });
            }
        }
        
        if(user.role ==='SELLER'){
            
            let store=await Store.findOneAndUpdate({owner:req.user._id},{
                storeName:req.body.storeName
            });

            if(req.files.storePicupload)
            {
                if(req.files.storePicupload[0].fieldname==='storePicupload'){
                    store = await Store.findOneAndUpdate({owner:req.user._id},{
                        storePic:req.files.storePicupload[0].filename
                    });
                }

                                    
                if(store) return res.status(200).json({
                    message:'User and Store Updated',
                    errCode:'SUCCESS'
                })
            }

        }

        return res.status(200).json({
            message:'User Updated',
            errCode:'SUCCESS'
        })

    }catch(e)
    {
        return res.status(200).json({
            message:`INTERNAL SERVER ERROR OCCURED ${e.message}`,
            errCode:'FAILURE'
        })
    }
}
/*--------------------->UPDATE USER CONTROLLER <----------------- */

/*--------------------->SEARCH STORE CONTROLLER <----------------- */
module.exports.SEARCHSTORE_API__CONTROLLER = async (req,res)=>{
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
/*--------------------->SEARCH STORE CONTROLLER <----------------- */

