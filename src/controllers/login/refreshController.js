const tokens = require('../../tokens/tokens');

function refreshController(req, res){
    const refreshToken = req.body.refreshToken;
    if(!refreshToken) return res.status(401).json({error: 'Missing Token'});
    const accessToken = tokens.refreshExpiredToken(refreshToken);
    if(accessToken)
        res.status(200).json({accessToken: accessToken});
    else
        res.status(403).json({error: 'Invalid Token'});
}

module.exports = {refreshController};