const passport = require('passport');
const tokens = require('../../tokens/tokens');


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