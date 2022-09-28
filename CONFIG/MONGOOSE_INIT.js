/* ------> IMPORT DEPENDENCIES <------ */
const mongoose = require('mongoose');
require('dotenv').config();

/* ------> CONNECT USING DB STRING <------ */
if(process.env.NODE_ENV==='production')
{
    mongoose.connect(process.env.MONGO_ATLASDB);
}

if(process.env.NODE_ENV==='development')
{
    mongoose.connect(process.env.MONGO_LOCALDB);
}


/* ------> GET THE CONNECTION OBJECT FROM MONGOOSE <------ */
const db = mongoose.connection;

/* ------> INITIATE LISTENERS <------ */
db.on('error', function(err){
    return console.log('MONGO DB ERROR IN CONNECTION');
})

db.once('open', function(){
    return console.log('MONGO DB SERVICE RUNNING');
})

/* ------> EXPORT DB <------ */
module.exports = db;