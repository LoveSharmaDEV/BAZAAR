// IMPORT DEPENDENCIES
const mongoose = require('mongoose');

// CREATE SCHEMA
const refereshTokenSchema = new mongoose.Schema({
    token:
        {
            type:String,
            trim: true
        }
    
},{timestamps:true})

// EXPORT MODEL
module.exports = mongoose.model("Token", refereshTokenSchema);