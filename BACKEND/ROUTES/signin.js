//IMPORT DEPENDENCIES
const express = require('express');
const router = express.Router();

router.post('/', require('../CONTROLLERS/index').signinController)

// EXPORT ROUTER
module.exports = router