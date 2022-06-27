const mongoose = require('mongoose');

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

module.exports = mongoose.model('Order',OrderSchema);