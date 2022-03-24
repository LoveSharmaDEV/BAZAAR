const express = require('express');
const router = express.Router();
const upload = require('../CONFIG/multer_PostPic');
const uploadPostController = require('../CONTROLLERS/index').uploadPostController;
const authenticator = require('../MIDDLEWARES/authenticator').authenticator


router.post('/post',authenticator,upload.single('image'), uploadPostController)

module.exports = router