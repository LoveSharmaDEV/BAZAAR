import socketIO from 'socket.io-client'
const ENDPOINT = 'http://localhost:8000'

const socket = {socket:socketIO(ENDPOINT,{transports:['websocket']})}


export default socket;

