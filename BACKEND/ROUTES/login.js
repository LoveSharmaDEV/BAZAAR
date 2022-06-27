// IMPORT DEPENDECIES
const express = require('express');
const router = express.Router();

router.post('/',require('../CONTROLLERS/index').Login_CONTROLLER);


// EXPORT ROUTER
module.exports = router;