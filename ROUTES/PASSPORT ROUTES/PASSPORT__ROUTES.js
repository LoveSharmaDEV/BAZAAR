const express = require('express');
const router = express.Router();
const passport = require('../../CONFIG/PASSPORT_STRATEGIES');
const CLIENT_HOME_URL='/home'
const CLIENT_LOGIN_URL='/login'

router.get('/google',
passport.authenticate("google", {
    scope: ["profile", "email"]
    }
));

router.get("/google/callback",
    passport.authenticate("google",{failureRedirect:CLIENT_LOGIN_URL,successRedirect:`${CLIENT_HOME_URL}?SocialAuth=true&SocialApp=google`})
)

router.get('/facebook',
passport.authenticate("facebook"));

router.get("/facebook/callback",
    passport.authenticate("facebook",{failureRedirect:CLIENT_LOGIN_URL,successRedirect:`${CLIENT_HOME_URL}?SocialAuth=true&SocialApp=facebook`})
)

router.get('/github',
passport.authenticate("github",{
    scope: ["profile", "email"]
    }));

router.get("/github/callback",
    passport.authenticate("github",{failureRedirect:CLIENT_LOGIN_URL,successRedirect:`${CLIENT_HOME_URL}?SocialAuth=true&SocialApp=github`})
)

router.get('/amazon',
passport.authenticate("amazon",{
    scope: ["profile"]
    }));

router.get("/amazon/callback",
    passport.authenticate("amazon",{failureRedirect:CLIENT_LOGIN_URL,successRedirect:`${CLIENT_HOME_URL}?SocialAuth=true&SocialApp=amazon`})
)
    
router.post("/google/success",
    require('../../CONTROLLERS/API LIVE/PASSPORT APIS/PASSPORT_API_CONTROLLER').GOOGLEAUTHSUCCESS_API__CONTROLLER
)

router.post("/facebook/success",
    require('../../CONTROLLERS/API LIVE/PASSPORT APIS/PASSPORT_API_CONTROLLER').FACEBOOKAUTHSUCCESS_API__CONTROLLER
)

router.post("/github/success",
    require('../../CONTROLLERS/API LIVE/PASSPORT APIS/PASSPORT_API_CONTROLLER').GITHUBAUTHSUCCESS_API__CONTROLLER
)

router.post("/amazon/success",
    require('../../CONTROLLERS/API LIVE/PASSPORT APIS/PASSPORT_API_CONTROLLER').AMAZONAUTHSUCCESS_API__CONTROLLER
)

module.exports = router;