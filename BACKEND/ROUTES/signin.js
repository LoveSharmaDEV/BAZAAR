//IMPORT DEPENDENCIES
const express = require('express');
const router = express.Router();

router.post('/', require('../CONTROLLERS/index').Signin_CONTROLLER)

// EXPORT ROUTER
module.exports = router