//IMPORT DEPENDENCIES
const User = require('../MODELS/index').User;
const Store = require('../MODELS/index').Store;


module.exports.signinController = async (req,res)=>{
    
    try{
        /*------------Password Validate-------------------*/
        if(req.body.password != req.body.confirmpassword){
            return res.status(200).json({
                message: "PASSWORD MISMATCH",
                errCode: "PASSWORDCHECK"
            });
        }
        /*-------------------------------------------------*/
        
        /*-------------User Validate-----------------------*/
        let user = await User.findOne({
            email: req.body.email
        })
        if(user) return res.status(200).json({
            message: "EMAIL ALREADY EXISTS",
            errCode: "USERALREADYEXISTS"
        });
         user = await User.findOne({
            username: req.body.username
        })
        if(user) return res.status(200).json({
            message: "USERNAME ALREADY EXISTS",
            errCode: "USERALREADYEXISTS"
        });

        /*-------------------------------------------------*/

        /*---------------Store Validate--------------------*/
        if(req.body.storeName)
        {
            let store = await Store.findOne({"storeName":req.body?.storename});
            if(store) return res.status(200).json({
                message: "STORE ALREADY EXISTS",
                errCode: "STOREALREADYEXISTS"
            })
        }
        /*-------------------------------------------------*/
        

        
        /*------------- Create User------------------------*/
        user = await User.create({
            "username":req.body.username,
            "password": req.body.password,
            "email": req.body.email,
            "contact": req.body.contact,
            "DOB": req.body.DOB,
            "role":req.body.role
        })

        /*-------------------------------------------------*/



        /*------------- Create Store------------------------*/
        if(req.body.storeName){
            store = await Store.create({
                "storeName": req.body?.storeName,
                "owner": user._id
            })    


        user.following.push(store._id);
        user.save();
        }

        /*-------------------------------------------------*/

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