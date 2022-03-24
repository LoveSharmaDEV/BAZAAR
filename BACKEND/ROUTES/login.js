// IMPORT DEPENDECIES
const express = require('express');
const router = express.Router();

router.post('/',require('../CONTROLLERS/index').loginController);


// EXPORT ROUTER
module.exports = router;