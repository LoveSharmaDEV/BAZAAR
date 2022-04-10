const express = require('express');
const { authenticator } = require('../MIDDLEWARES');
const router = express.Router();

router.post('/',authenticator.authenticator,require('../CONTROLLERS/index').ChatInit_Controller);

module.exports = router;