const express = require('express');
const router = express.Router();

router.post('/store', require('../CONTROLLERS/index').searchStoreController)

module.exports = router;