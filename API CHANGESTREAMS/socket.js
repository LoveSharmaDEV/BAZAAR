const socket = require('socket.io');
const chat_UPDATE = require('./chat_UPDATE');

const activeUser={}

const getActiveUser = ()=>{
    return activeUser;
}

const populateActiveUser = (socket)=>{
    socket.on('userDetail', ({userID})=>{
        if(userID) activeUser[userID]=socket.id;
    })
}

const disconnectConnection = (socket)=>{
    socket.on('disconnect',()=>{
        delete activeUser[socket.id];
    })
}

const InitConnection = (io)=>{
    io.on('connection',(socket)=>{
        // As soon as a socket connection is made, I will store the user
        populateActiveUser(socket);

        // Set up a disconnect listener for the same socket
        disconnectConnection(socket);
        
        chat_UPDATE(socket,io,getActiveUser);
    })
}



const socketIO = (server)=>{
    const io = socket(server) // Returns "io" i.e connection object
    InitConnection(io);    
}

module.exports = {socketIO,activeUser};
