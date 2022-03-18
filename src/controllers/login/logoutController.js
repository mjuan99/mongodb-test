const tokens = require('../../tokens/tokens');

function logoutController(req, res){
    tokens.deleteToken(req.body.refreshToken);
    res.status(200).json({message: 'Logged Out'});
}

module.exports = {logoutController};