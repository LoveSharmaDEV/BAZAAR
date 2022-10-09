const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const AmazonStrategy = require("passport-amazon").Strategy;
const GithubStrategy = require("passport-github").Strategy;
require('dotenv').config();

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})


/*-------> GOOGLE STRATEGY <------- */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE__CLIENTID,
    clientSecret: process.env.GOOGLE__CLIENTSECRET,
    callbackURL: "/passport/auth/google/callback",
    passReqToCallback:true
},
async (request ,accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
/*-------> GOOGLE STRATEGY <------- */

/*-------> FACEBOOK STRATEGY <------- */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK__CLIENTID,
    clientSecret: process.env.FACEBOOK__CLIENTSECRET,
    callbackURL: "/passport/auth/facebook/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(profile)
    return cb(null, profile);
}));
/*-------> FACEBOOK STRATEGY <------- */


/*-------> AMAZON STRATEGY <------- */
passport.use(new AmazonStrategy({
    clientID: process.env.AMAZON__CLIENTID,
    clientSecret: process.env.AMAZON__CLIENTSECRET,
    callbackURL: "/passport/auth/amazon/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(profile)
    return cb(null, profile);
}));

/*-------> AMAZON STRATEGY <------- */


/*-------> GITHUB STRATEGY <------- */
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB__CLIENTID,
    clientSecret: process.env.GITHUB__CLIENTSECRET,
    callbackURL: "/passport/auth/github/callback"
},
(accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));
/*-------> GITHUB STRATEGY <------- */



module.exports = passport