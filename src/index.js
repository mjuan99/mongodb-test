require('dotenv').config();
const mongoose = require('mongoose');


const winston = require('winston');
const {format} = winston;

const printFormat = format.printf(({level, message, timestamp, requestID, ...metadata}) => {
    const metadataString = JSON.stringify(metadata);
    return `${timestamp} [${level}]${requestID ? ' request ' + requestID : ''}: ${message}${(metadataString != '{}') ? ' - ' + metadataString : ''}`;
});
const requestLogger = winston.loggers.add('request-logger', {
    level: 'debug',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        printFormat
    ),
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.File({filename: 'debug.log', level: 'debug'}),
        new winston.transports.File({filename: 'info.log', level: 'info'}),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'error.log'})
    ]
});
requestLogger.debug('Debugging');

const express = require('express');
const requestID = require('express-request-id');
const app = express();
app.use(express.json());
app.use(requestID());

const healthRoutes = require('./routes/healthRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
app.use('/health', healthRoutes);
app.use('/questionnaire', questionnaireRoutes);

app.listen(process.env.PORT, async () => {
    requestLogger.info('Server starting');
    await mongoose.connect(process.env.DB_URL);
    console.log("Listening in port " + process.env.PORT)
});