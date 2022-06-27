const express = require('express');
const router = express.Router();
const authenticator = require('../MIDDLEWARES/authenticator').authenticator


router.post('/togglelike',authenticator,require('../CONTROLLERS/index').ToggleLikePost_CONTROLLER);
router.post('/comment',authenticator,require('../CONTROLLERS/index').CommentPost_CONTROLLER);
router.post('/comment/fetch',authenticator,require('../CONTROLLERS/index').CommentFetch_CONTROLLER);
router.post('/comment/togglelike',authenticator,require('../CONTROLLERS/index').ToggleLikeComment_CONTROLLER);



module.exports = router