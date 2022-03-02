const mongoose = require('mongoose');
async function getHealthController(req, res){
    if(mongoose.STATES[mongoose.connection.readyState] == "connected")
        res.status(200).json({message: 'OK'});
    else
        res.status(500).json({error: 'Server Error'});
}

module.exports = getHealthController;