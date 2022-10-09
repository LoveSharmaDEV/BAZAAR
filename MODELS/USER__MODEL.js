/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

/* ------> DEFINE SCHEMA <------ */
const userSchema = new  mongoose.Schema({
    profilepic:{
        type:String,
        trim:true
    },
    username:{
        type:String,
        trim:true,
    },
    password:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
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
    ],
    SocialAuth:{
        type:Boolean,
        default:false
    },
    SocialAuthID:{
        type:String,
    }

},{
    timestamps:{
        createdAt:true,
        updatedAt:false
    }
})


userSchema.pre('save',async function (next){

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error)
    }
})


/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model("User", userSchema);
