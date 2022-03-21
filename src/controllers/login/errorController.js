function errorController(req, res){
    res.status(400).json({error: 'Login Error'});
}

module.exports = {errorController};