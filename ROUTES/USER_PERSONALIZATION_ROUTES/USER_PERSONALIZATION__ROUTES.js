const express = require('express');
const authenticator  = require('../../MIDDLEWARES/index').authenticator;
const USERIMAGE = require('../../CONFIG/MULTER_PROFILEPICTURES');
const router = express.Router()

router.post('/followers',
authenticator,
require('../../CONTROLLERS/API LIVE/USER PERSONALIZATION APIS/USERPERSONALIZATION_API_CONTROLLER').FETCHFOLLWERS_API__CONTROLLER);

router.post('/deactivate/user',
authenticator,
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').DEACTIVATEUSER_API__CONTROLLER);

router.post('/update/user',
authenticator,
USERIMAGE.fields([{name:'profilepicupload',maxCount:1},{name:'storePicupload',maxCount:1}]),
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').UPDATEUSER_API__CONTROLLER);

router.post('/follow/store',
authenticator,
require('../../CONTROLLERS/API LIVE/USER PERSONALIZATION APIS/USERPERSONALIZATION_API_CONTROLLER').FOLLOWSTORE_API__CONTROLLER);

router.post('/unfollow/store',
authenticator,
require('../../CONTROLLERS/API LIVE/USER PERSONALIZATION APIS/USERPERSONALIZATION_API_CONTROLLER').UNFOLLOWSTORE_API__CONTROLLER);

module.exports = router