// IMPORT DEPENDENCIES AND ADDITIONAL ROUTES
const express = require('express');
const router = express.Router();

/*---> AUTH ROUTE <--- */
router.use('/auth',require('./AUTH ROUTES/AUTH__ROUTE'))

/*---> CHAT ROUTE <--- */
router.use('/chat',require('./CHAT ROUTES/CHAT__ROUTES'))

/*---> ECOMM ROUTE <--- */
router.use('/ecomm',require('./ECOMM ROUTES/ECOMM__ROUTES'))

/*---> POST ROUTE <--- */
router.use('/post',require('./POST ROUTES/POST__ROUTES'))

/*---> USER PERSONALIZATION ROUTE <--- */
router.use('/user-personalization',require('./USER_PERSONALIZATION_ROUTES/USER_PERSONALIZATION__ROUTES'))

/*---> STRIPE ROUTE <--- */
router.use('/stripe',require('./STRIPE ROUTES/STRIPE__ROUTES'))



// EXPORT ROUTER
module.exports = router;