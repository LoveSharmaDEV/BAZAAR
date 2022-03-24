//  REQUIRE DEPENDENCIES
const mongoose = require('mongoose');

// CREATE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/Product');

// GET THE CONNECTION
const db = mongoose.connection;


// CHECK FOR LIVE SERVER
db.on('error', function(err){
    return console.log('MONGO DB ERROR IN CONNECTION');
})

db.once('open', function(){
    return console.log('MONGO DB SERVICE RUNNING');
})

module.exports = db;