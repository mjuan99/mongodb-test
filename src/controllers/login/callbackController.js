const tokens = require('../../tokens/tokens');const authGoogle = require('./authGoogleController');

function callbackController(req, res){
    const user = req.user;
    res.status(200).json({accessToken: tokens.getAccessToken(user), refreshToken: tokens.getRefreshToken(user)});
}

module.exports = {callbackController};