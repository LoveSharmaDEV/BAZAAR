// IMPORT DEPENDENCIES AND ADDITIONAL ROUTES
const express = require('express');
const router = express.Router();

//LOGIN ROUTE
router.use('/login', require('./login'));

// SIGN-IN ROUTE
router.use('/signin',require('./signin'))

// REFERESH TOKEN ROUTE
router.use('/refresh', require('./refresh'));

// VERIFY TOKEN
router.use('/verify',require('./verify'))

//UPLOAD POST
router.use('/upload', require('./upload'))

// FETCH DATA
router.use('/fetch', require('./fetch'))


// SEARCH DATA
router.use('/search', require('./search'))

// FOLLOW
router.use('/follow', require('./follow'))

// UNFOLLOW
router.use('/unfollow', require('./unfollow'))

// CHAT INIT
router.use('/chatinit', require('./chatinit'))


// EXPORT ROUTER
module.exports = router;