const express = require('express');
const { authenticator } = require('../MIDDLEWARES/authenticator');
const router = express.Router()


router.get('/post',authenticator, require('../CONTROLLERS/index').fetchPostController);
router.get('/chat', authenticator, require('../CONTROLLERS/index').fetchChatController);
router.post('/customer',authenticator,require('../CONTROLLERS/index').fetchCustomerController);
router.post('/seller',authenticator,require('../CONTROLLERS/index').fetchSellerController);


module.exports = router