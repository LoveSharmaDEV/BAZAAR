const chat_UPDATE = async (socket,io,getActiveUser)=>{
    socket.on('ChatChangeStream',async ({conversationID,message})=>{
        const clients = getActiveUser();
        const clientSocket = Object.keys(clients).find(key => clients[key] === message.To.toString());
        io.to(clientSocket).emit(conversationID, {message:message});
    });
}

module.exports = chat_UPDATE