const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    return done(null, {profile: profile});
}));

const {authGoogleController, authGoogleRedirectController, authGoogleCallbackController, authGoogleErrorController} = require('./authGoogleController');
/*const {authGoogleRedirectController} = require('./authGoogleRedirectController');
const {authGoogleCallbackController} = require('./authGoogleCallbackController');
const {authGoogleErrorController} = require('./authGoogleErrorController');*/
const {refreshController} = require('./refreshController');
const {logoutController} = require('./logoutController');

module.exports = {authGoogleController, authGoogleRedirectController, authGoogleCallbackController, authGoogleErrorController, refreshController, logoutController};