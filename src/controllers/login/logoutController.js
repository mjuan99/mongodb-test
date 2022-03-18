const tokens = require('../../tokens/tokens');

function logoutController(req, res){
    if(tokens.deleteToken(req.body.refreshToken))
        res.status(200).json({message: 'Logged Out'});
    else
        res.status(403).json({error: 'Invalid Token'});
}

module.exports = {logoutController};