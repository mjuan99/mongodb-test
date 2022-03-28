const passport = require('passport');
const jwt = require('jsonwebtoken');

const AppleStrategy = require('passport-apple');
passport.use(new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    callbackURL: 'https://mylocaladdr.com:3000/auth/apple/callback', // Note: set the redirection mylocaladdr.com -> 127.0.0.1 in the operative system
    keyID: process.env.APPLE_KEY_ID,
    privateKeyLocation: process.env.APPLE_PRIVATE_KEY_LOCATION,
    passReqToCallback: true
}, function(req, accessToken, refreshToken, idToken, profile, cb) {
    // The idToken returned is encoded. You can use the jsonwebtoken library via jwt.decode(idToken)
    // to access the properties of the decoded idToken properties which contains the user's
    // identity information.
    // Here, check if the idToken.sub exists in your database!
    // idToken should contains email too if user authorized it but will not contain the name
    // `profile` parameter is REQUIRED for the sake of passport implementation
    // it should be profile in the future but apple hasn't implemented passing data
    // in access token yet https://developer.apple.com/documentation/sign_in_with_apple/tokenresponse
    const user = {email: jwt.decode(idToken).email};
    cb(null, user);
}));

const loginController = passport.authenticate('apple', {session: false});
const redirectController = passport.authenticate('apple', {failureRedirect: '/error', session: false});


module.exports = {loginController, redirectController};
