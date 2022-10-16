/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');

/* ------> DEFINE SCHEMA <------ */
const FollowSchema = new mongoose.Schema({
    USER:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'User' 
    },
    FOLLOWING:[{
        type:mongoose.Schema.Types.ObjectId,
        refPath: 'Store'
    }],
},{timestamps:true})


/* ------> EXPORT SCHEMA <------ */
module.exports = mongoose.model('Follow',FollowSchema)