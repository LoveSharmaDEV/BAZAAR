const express = require('express');
const authenticator  = require('../../MIDDLEWARES/index').authenticator;
const router = express.Router()


//router.post('/chat', authenticator, require('../CONTROLLERS/index').Fetch_Chat_Message_CONTROLLER);
//router.post('/chatid',authenticator, require('../CONTROLLERS/index').Fetch_ChatID_CONTROLLER);
//router.post('/chatheader',authenticator,require('../CONTROLLERS/index').Fetch_Chat_Highlight_Header_CONTROLLER);
router.post('/conversations', authenticator, require('../../CONTROLLERS/API LIVE/CHAT APIS/CHAT_API__CONTROLLER').FETCHALLCHATS_API__CONTROLLER);
router.post('/save/message',require('../../CONTROLLERS/API LIVE/CHAT APIS/CHAT_API__CONTROLLER').SAVEMESSAGE_API__CONTROLLER);
router.post('/init',authenticator,require('../../CONTROLLERS/API LIVE/CHAT APIS/CHAT_API__CONTROLLER').CHATINIT_API__CONTROLLER);
router.post('/fetch/store',authenticator,require('../../CONTROLLERS/API LIVE/CHAT APIS/CHAT_API__CONTROLLER').FETCH_STORE_API_CONTROLLER);




module.exports = router