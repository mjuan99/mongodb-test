require('dotenv').config();
const mongoose = require('mongoose');


const winston = require('winston');
const {format} = winston;

const printFormat = format.printf(({level, message, timestamp, ...metadata}) => {
    const metadataString = JSON.stringify(metadata);
    return `${timestamp} [${level}]: ${message}${(metadataString != '{}') ? ' - ' + metadataString:''}`;
});
const requestLogger = winston.loggers.add('request-logger', {
    format: format.combine(
        format.colorize(),
        format.timestamp({format: 'YYYY-MM-DD HH:MM:SS'}),
        printFormat
    ),
    transports: [new winston.transports.Console(), new winston.transports.File({filename: 'error.log', level: 'error'})],
    exceptionHandlers: [new winston.transports.Console(), new winston.transports.File({filename: 'error.log'})]
});


const express = require('express');
//const requestID = require('express-request-id');
const app = express();
app.use(express.json());
//app.use(requestID());

const healthRoutes = require('./routes/healthRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const { level } = require('winston');
app.use('/health', healthRoutes);
app.use('/questionnaire', questionnaireRoutes);

app.listen(process.env.PORT, async () => {
    requestLogger.info('Starting Server');
    //await mongoose.connect(process.env.DB_URL);
    console.log("Listening in port " + process.env.PORT)
});