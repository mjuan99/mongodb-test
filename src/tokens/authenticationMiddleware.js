const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if(err) return res.status(403).json({error: 'Invalid Token'});
            req.body.userID = user.email;
            next();
        });
    }
    else
        return res.status(401).json({error: 'Missing Token'});
}

module.exports = {authenticateToken};