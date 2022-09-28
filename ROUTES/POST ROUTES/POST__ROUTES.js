const express = require('express');
const authenticator  = require('../../MIDDLEWARES/index').authenticator;
const POSTPICTURES = require('../../CONFIG/MULTER_POSTPICTURES');
const router = express.Router();



router.post('/fetch/post',
authenticator, 
require('../../CONTROLLERS/API LIVE/POST APIS/POST_API_CONTROLLER').FETCHFEEDS_API__CONTROLLER);

/* ---> localhost:8000/upload/post <--- */
router.post('/upload/post',
authenticator,
POSTPICTURES.array('postPic'),
require('../../CONTROLLERS/API LIVE/POST APIS/POST_API_CONTROLLER').UPLOADPOST_API__CONTROLLER)
/* ---> localhost:8000/upload/post <--- */

/* ---> localhost:8000/delete/post <--- */
router.post('/delete/post',
authenticator,
require('../../CONTROLLERS/API LIVE/POST APIS/POST_API_CONTROLLER').DELETEPOST_API__CONTROLLER)
/* ---> localhost:8000/delete/post <--- */

router.post('/togglelike/post',
authenticator,
require('../../CONTROLLERS/API LIVE/POST APIS/POST_API_CONTROLLER').TOGGLELIKEONPOST_API__CONTROLLER);


router.post('/upload/comment',
authenticator,
require('../../CONTROLLERS/API LIVE/POST APIS/POST_API_CONTROLLER').COMMENTPOST_API__CONTROLLER);


router.post('/fetch/comment',
authenticator,
require('../../CONTROLLERS/API LIVE/POST APIS/POST_API_CONTROLLER').COMMENTFETCH_API__CONTROLLER);

router.post('/togglelike/comment',
authenticator,
require('../../CONTROLLERS/API LIVE/POST APIS/POST_API_CONTROLLER').TOGGLELIKEONCOMMENT_API__CONTROLLER);

module.exports = router