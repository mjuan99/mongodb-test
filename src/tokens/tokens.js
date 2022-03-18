const jwt = require('jsonwebtoken');

let refreshTokens = [];

function getAccessToken(user){
    return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '15s'});
}

function getRefreshToken(user){
    const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_TOKEN);
    refreshTokens.push(refreshToken);
    return refreshToken;
}

function deleteToken(refreshToken){
    if(refreshTokens.includes(refreshToken)){
        refreshTokens = refreshTokens.filter(token => token != refreshToken);
        return true;
    }
    else
        return false;
}

function refreshExpiredToken(refreshToken){
    if(!refreshTokens.includes(refreshToken)) return null;
    try{
        const user = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
        return jwt.sign({email: user.email}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '15s'});
    }
    catch{
        return null;
    }

}

module.exports = {getAccessToken, getRefreshToken, deleteToken, refreshExpiredToken};