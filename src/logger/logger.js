const winston = require('winston');
const {format} = winston;

const printFormat = format.printf(({level, message, timestamp, startTime, requestID, ...metadata}) => {
    const metadataString = Object.keys(metadata).length != 0 ? ' - ' + JSON.stringify(metadata) : '';
    const requestIDString = requestID ? ' request ' + requestID : '';
    const durationString = startTime ? ' ' + (parseInt(process.hrtime.bigint() - startTime) / 1000000) + 'ms' : '';
    return `${timestamp} [${level}]${requestIDString}: ${message}${durationString}${metadataString}`;
});

const requestLogger = winston.loggers.add('request-logger', {
    level: process.env.NODE_ENV == 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        printFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'requests.log'}),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'error.log'})
    ]
});

module.exports = {requestLogger};