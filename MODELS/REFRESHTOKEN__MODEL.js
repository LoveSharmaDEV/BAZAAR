/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const refereshTokenSchema = new mongoose.Schema({
    token:
        {
            type:String,
            trim: true
        }
    
},{timestamps:true})

/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model("Token", refereshTokenSchema);