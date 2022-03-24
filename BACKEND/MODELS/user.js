// IMPORT DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const userSchema = new  mongoose.Schema({
    profilepic:{
        type:String,
        default:'../UTILITIES/UPLOADED_PROFILE_PICS/default.png',
        trim:true
    },
    username:{
        type:String,
        unique: true,
        trim:true,
        required:true
    },
    password:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum:['SELLER', 'CUSTOMER']
    },
    contact:{
        type:Number,
    },
    DOB:{
        type:Date
    },
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Store'
        }
    ]
},{
    timestamps:{
        createdAt:true,
        updatedAt:false
    }
})


// EXPORT MODEL
module.exports = mongoose.model("User", userSchema);
