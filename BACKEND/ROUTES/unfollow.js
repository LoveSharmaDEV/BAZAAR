const express = require('express');
const { authenticator } = require('../MIDDLEWARES/index').authenticator;
const router = express.Router();

router.post('/store',authenticator, require('../CONTROLLERS/index').Unfollow_Store_CONTROLLER);

module.exports = router;