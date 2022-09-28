const stripe = require('stripe')('');
const Stripe = require('../../../MODELS/index').Stripe

module.exports.PAYMENTSESSION_API__CONTROLLER = async (req,res)=>{
    try{
        const StripeDBUser = await Stripe.findOne({user:req.user._id});
        if(StripeDBUser)
        {    
            const session = await stripe.checkout.sessions.create(
            {
                payment_method_types:['card'],
                mode:'payment',

                line_items:req.body.products.map((product)=>{
                    return {
                        price_data:{
                            currency:'INR',
                            product_data:{
                                name:product.product.ProductName
                            },
                            unit_amount:product.product.ProductPrice*100
                        },
                        quantity:product.Quantity
                    }
                }),
                success_url:`http://localhost:3000/cart`,
                cancel_url:`http://localhost:3000/cart`,
                payment_intent_data:{
                    transfer_data:{
                        destination:{}
                    }
                }
            })
            return res.status(200).json({
                message:'CHECKOUT SUCCESS',
                errCode:'SUCCESS',
                url:session.url
                })
        }

        return res.status(200).json({
            message:'USER NOT ELIGILBLE FOR PAYMENT',
            errCode:'UNAUTHORIZED',
            url:session.url
            })
}
catch(e)
{
    return res.status(200).json({
        message: `INTERNAL SERVER ERROR ${e.message}`,
        errCode:'FAILURE'
    })
}
}

module.exports.CREATECONNECTEDACCOUNT_API__CONTROLLER = async (req,res)=>{
    try{

        // CREATE AN ACCOUNT
        const account = await stripe.accounts.create({
            type:'custom',
            country:'US',
            email:req.user.email,
            capabilities:{
                card_payments:{requested:true},
                transfers:{requested:true}
            }
        });

        // SAVE THE ACCOUNT ID IN DB FOR LATER USE
        const StripeDBUser = await Stripe.findOne({user:req.user._id});
        if(StripeDBUser)
        {
            await Stripe.findOneAndUpdate({user:req.user._id},{connectedAccount:account.id})
        }
        else{
            await Stripe.create({user:req.user._id,connectedAccount:account.id});

        }


        // CREATE AN ACCOUNT LINK
        const accountLink = await stripe.accountLinks.create({
            account:account.id,
            refresh_url:'http://localhost:3000/store',
            return_url:'http://localhost:3000/store',
            type:'account_onboarding',
        })

        return res.status(200).json({
            message:'Stripe OnBoarding Process Initiated',
            errCode:'SUCCESS',
            url:accountLink.url
        })
        
    }
    catch(e)
    {
        res.status(200).json({
            message: `INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}

module.exports.CONTINUEONBARDINGPROCESS_API__CONTROLLER = async (req,res)=>{
    try{

        const StripeDBUser = await Stripe.findOne({user:req.user._id});
        if(StripeDBUser)
        {
            // CREATE AN ACCOUNT LINK
            const accountLink = await stripe.accountLinks.create({
                account:StripeDBUser.connectedAccount,
                refresh_url:'http://localhost:3000/store',
                return_url:'http://localhost:3000/store',
                type:'account_onboarding',
            })

            return res.status(200).json({
                message:'Stripe OnBoarding Process Initiated',
                errCode:'SUCCESS',
                url:accountLink.url
            })
        }
        else{
            return res.status(200).json({
                message:'User Account not intitiated Yet',
                errCode:'FAILURE',
            })
        }

    }catch(e)
    {
        res.status(200).json({
            message: `INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}

module.exports.USERACCOUNTCHECK_API__CONTROLLER = async (req,res)=>{
    try{
        const StripeDBUser = await Stripe.findOne({user:req.user._id});
        if(!StripeDBUser)
        {
            return res.status(200).json({
                message:'User Account not intitiated Yet',
                errCode:'SUCCESS',
                createAccount:true,
                continueOnBoarding:false
            })
        }

        const account = await stripe.account.retrieve(StripeDBUser.connectedAccount);
        if(account.charges_enabled)
        {
            return res.status(200).json({
                message:'Account Enabled and ready for Payment',
                errCode:'SUCCESS',
                createAccount:false,
                continueOnBoarding:false
            })
        }

        return res.status(200).json({
            message:'User Account not intitiated Yet',
            errCode:'SUCCESS',
            createAccount:false,
            continueOnBoarding:true
        })
    }
    catch(e){
        return res.status(200).json({
            message: `INTERNAL SERVER ERROR ${e.message}`,
            errCode:'FAILURE'
        })
    }
}
