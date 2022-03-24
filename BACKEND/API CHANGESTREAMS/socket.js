const socket = require('socket.io');
const post_UPDATE = require('./post_UPDATE');
const activeUser={}

const getActiveUser = ()=>{
    return activeUser;
}

const populateActiveUser = (socket)=>{
    socket.on('loginUser',({user})=>{
        if(user) activeUser[socket.id]=user._id;
    })
}

const disconnectConnection = (socket)=>{
    socket.on('disconnect',()=>{
        delete activeUser[socket.id];
    })
}

const InitConnection = (io)=>{
    io.on('connection',(socket)=>{
        populateActiveUser(socket);
        disconnectConnection(socket);

        
        //UPDATE POST
        post_UPDATE(socket,io,getActiveUser);
    })
}



const socketIO = (server)=>{
    const io = socket(server)
    InitConnection(io);    
}

module.exports = {socketIO,activeUser};
