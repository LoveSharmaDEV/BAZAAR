const chat_UPDATE = (socket,io,getActiveUser)=>{

    socket.on('ChatChangeStream',({conversationID,message})=>{
        const clients = getActiveUser();
        const clientSocket = Object.keys(clients).find(key => clients[key] === message.To._id.toString());
        io.to(clientSocket).emit(conversationID, {message:message});
    });
}

module.exports = chat_UPDATE