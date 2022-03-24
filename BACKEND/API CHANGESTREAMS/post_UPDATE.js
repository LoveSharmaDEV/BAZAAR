const User = require('../MODELS/index').User;
const Store = require('../MODELS/index').Store;
//const activeUser = require('./socket');

const post_UPDATE = async (socket,io,getActiveUser)=>{
    socket.on('UpdatePostChangeStream',async ({user})=>{
        const store = await Store.findOne({owner:user});
        const users = await User.find({following:{$in:store._id}});
        users.map((user)=>{
            const clients = getActiveUser();
            const clientSocket = Object.keys(clients).find(key => clients[key] === user._id.toString());
            io.to(clientSocket).emit('post_UPDATE');
        })
    });
}

module.exports = post_UPDATE