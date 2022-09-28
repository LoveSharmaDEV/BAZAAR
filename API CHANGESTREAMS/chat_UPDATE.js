const chat_UPDATE = (socket,io,getActiveUser)=>{

    socket.on('ChatChangeStream',({conversationID,message})=>{
        const clients = getActiveUser();
        const clientSocket = clients[message.To.toString()];
        io.to(clientSocket).emit(conversationID, {message:message});
    });
}

module.exports = chat_UPDATE