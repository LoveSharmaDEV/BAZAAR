/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const stripeDetails = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    connectedAccount:{
        type:String,
        required:true,
        unique:true
    }
    
})

/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model('Stripe',stripeDetails);