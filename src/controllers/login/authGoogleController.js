const passport = require('passport');
const tokens = require('../../tokens/tokens');


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

const authGoogleController = passport.authenticate('google', {scope: ['profile', 'email'], session: false});

const authGoogleRedirectController = passport.authenticate('google', {failureRedirect: '/auth/google/error', session: false});

function authGoogleCallbackController(req, res){
    const user = {email: req.user.profile.emails[0].value};
    res.status(200).json({accessToken: tokens.getAccessToken(user), refreshToken: tokens.getRefreshToken(user)});
}

function authGoogleErrorController(req, res){
    res.status(400).json({error: 'error logging in'});
}


module.exports = {authGoogleController, authGoogleRedirectController, authGoogleCallbackController, authGoogleErrorController};