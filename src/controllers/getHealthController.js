const mongoose = require('mongoose');

const winston = require('winston');
const requestLogger = winston.loggers.get('request-logger');

async function getHealthController(req, res){
    requestLogger.info('Starting GET /health', {requestID: req.id});
    if(mongoose.STATES[mongoose.connection.readyState] == "connected"){
        res.status(200).json({message: 'OK'});
        requestLogger.info('Response GET /health', {requestID: req.id, status: 200});
    }
    else{
        res.status(500).json({error: 'Server Error'});
        requestLogger.error('Response GET /health', {requestID: req.id, status: 500});
    }
}

module.exports = getHealthController;