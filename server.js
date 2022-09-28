/* ------> IMPORT DEPENDENCIES <------ */
const socketIO = require('./API CHANGESTREAMS/socket')
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
require('dotenv').config();

/* ------> INIT THE DB CONNECTION <------ */
const db = require('./CONFIG/MONGOOSE_INIT');

/* ------> INITIALIZE HTTP AND SOCKET SERVER <------ */
const app = express();
const server = http.createServer(app);
socketIO.socketIO(server);

/* ------> INTITIALIZE ASSET DIRECTORIES <------ */
app.use(express.static(path.join(__dirname, 'UTILITIES/UPLOADED_POST_PICS')));
app.use(express.static(path.join(__dirname, 'UTILITIES/UPLOADED_PROFILE_PICS')));
app.use(express.static(path.join(__dirname, 'UTILITIES/WEB_COMPONENTS')));
app.use(express.static(path.join(__dirname, 'UTILITIES/UPLOADED_PRODUCT_PICS')));

/* ------> DEFINE MIDDLEWARES <------ */
app.use(express.urlencoded(
    { extended: true }
));

app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

if(process.env.NODE_ENV==='development'){
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8000']
    }))
}


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./frontend/build'));
}

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  });

/* ------> ROUTE DEPENDENCIES <------ */
app.use('/', require('./ROUTES/index'))

/* ------> INITIATE LISTENERS <------ */
server.listen(process.env.PORT||8000, (err) => {

    if (err) {
        console.log(`ERROR CONNECTING TO PORT ${process.env.PORT?process.env.PORT:process.env.APP_PORT} : ${err}`);
        return;
    }
    console.log(`SUCCESSFULLY CONNECTED TO PORT ${process.env.PORT?process.env.PORT:process.env.APP_PORT}`);
})
