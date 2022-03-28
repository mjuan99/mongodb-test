const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    const user = {email: profile.emails[0].value};
    return done(null, user);
}));

const loginController = passport.authenticate('google', {scope: ['profile', 'email'], session: false});
const redirectController = passport.authenticate('google', {failureRedirect: '/error', session: false});


module.exports = {loginController, redirectController};