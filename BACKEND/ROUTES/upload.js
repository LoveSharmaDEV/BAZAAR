const express = require('express');
const router = express.Router();
const upload = require('../CONFIG/multer_PostPic');
const authenticator = require('../MIDDLEWARES/authenticator').authenticator


router.post('/post',authenticator,
upload.single('image'),
require('../CONTROLLERS/index').Upload_Post_Controller)

module.exports = router