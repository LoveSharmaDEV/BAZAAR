const express = require('express');
const { authenticator } = require('../MIDDLEWARES');
const router = express.Router();

router.post('/',authenticator.authenticator,require('../CONTROLLERS/index').SaveMessage_CONTROLLER);

module.exports = router;