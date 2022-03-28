const passport = require('passport');

const FacebookStrategy = require('passport-facebook');
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'https://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
},
(accessToken, refreshToken, profile, cb) => {
    const user = {email: profile.emails[0].value};
    return cb(null, user);
}));

const loginController = passport.authenticate('facebook', {session: false});
const redirectController = passport.authenticate('facebook', {failureRedirect: '/error', session: false});


module.exports = {loginController, redirectController};