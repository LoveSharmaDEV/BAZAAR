/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const OrderSchema = new mongoose.Schema({
    OrderStatus:{
        type:String,
        enum:["NOT CONFIRMED","CONFIRMED","SHIPPED","DELIVERED"],
        required:true
    },
    OrderAddress:{
        type:String,
        trim: true,
    },
    OrderDetail:[
        {
            Product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            Quantity:{
                type:Number
            },

        }
    ]
})

/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model('Order',OrderSchema);