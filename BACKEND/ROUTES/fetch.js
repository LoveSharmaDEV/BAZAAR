const express = require('express');
const { authenticator } = require('../MIDDLEWARES/authenticator');
const router = express.Router()


router.get('/post',authenticator, require('../CONTROLLERS/index').fetchPostController);
router.post('/chat', authenticator, require('../CONTROLLERS/index').FetchChatMessage_CONTROLLER);
router.post('/customer',authenticator,require('../CONTROLLERS/index').fetchCustomerController);
router.post('/seller',authenticator,require('../CONTROLLERS/index').fetchSellerController);
router.post('/chatid',authenticator, require('../CONTROLLERS/index').FetchChatID_CONTROLLER);


module.exports = router