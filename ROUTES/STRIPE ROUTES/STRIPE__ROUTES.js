const express = require('express');
const router = express.Router();
const authenticator  = require('../../MIDDLEWARES/index').authenticator;



router.post('/create-checkout-session',authenticator,require('../../CONTROLLERS/API LIVE/STRIPE APIS/STRIPE_API_CONTROLLER').PAYMENTSESSION_API__CONTROLLER);
router.post('/create-connected-account',authenticator,require('../../CONTROLLERS/API LIVE/STRIPE APIS/STRIPE_API_CONTROLLER').CREATECONNECTEDACCOUNT_API__CONTROLLER);
router.post('/continue-onboarding-process',authenticator,require('../../CONTROLLERS/API LIVE/STRIPE APIS/STRIPE_API_CONTROLLER').CONTINUEONBARDINGPROCESS_API__CONTROLLER);
router.post('/user-account-check',authenticator,require('../../CONTROLLERS/API LIVE/STRIPE APIS/STRIPE_API_CONTROLLER').USERACCOUNTCHECK_API__CONTROLLER);



module.exports = router