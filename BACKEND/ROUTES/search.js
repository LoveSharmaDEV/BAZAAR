const express = require('express');
const router = express.Router();

router.post('/store', require('../CONTROLLERS/index').Search_Store_CONTROLLER)

module.exports = router;