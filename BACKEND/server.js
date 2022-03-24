// IMPORT PRE-REQUISITE LIBRARIES
const socketIO = require('./API CHANGESTREAMS/socket')
const express = require("express");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
require('dotenv').config();

// IMPORT DB CONFIG
const db = require('./CONFIG/index').db;

// INITIALIZE APP
const app = express();
const server = http.createServer(app);
socketIO.socketIO(server);

// STATIC DIRECTORIES
app.use(express.static(path.join(__dirname, 'UTILITIES/UPLOADED_POST_PICS')));

// PRE-REQUISITE MIDDLEWARES
app.use(express.urlencoded(
    { extended: true }
));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8000']
}))

// SETTING UP THE ROUTES
app.use('/', require('./ROUTES/index'))




// APP LISTEN
server.listen(process.env.APP_PORT, (err) => {
    if (err) {
        console.log(`ERROR CONNECTING TO PORT ${process.env.APP_PORT} : ${err}`);
        return;
    }
    console.log(`SUCCESSFULLY CONNECTED TO PORT ${process.env.APP_PORT}`);
})
