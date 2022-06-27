const express = require('express');
const { authenticator } = require('../MIDDLEWARES/authenticator');
const router = express.Router()


router.get('/post',authenticator, require('../CONTROLLERS/index').Fetch_Post_Controller);
router.post('/chat', authenticator, require('../CONTROLLERS/index').Fetch_Chat_Message_CONTROLLER);
router.post('/chatid',authenticator, require('../CONTROLLERS/index').Fetch_ChatID_CONTROLLER);
router.get('/conversations', authenticator, require('../CONTROLLERS/index').Fetch_All_Chats_CONTROLLER);
router.post('/chatheader',authenticator,require('../CONTROLLERS/index').Fetch_Chat_Highlight_Header_CONTROLLER)

module.exports = router