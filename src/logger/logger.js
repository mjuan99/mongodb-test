const winston = require('winston');
require('winston-daily-rotate-file');
const {format} = winston;

const printFormat = format.printf(({level, message, timestamp, startTime, requestID, ...metadata}) => {
    const metadataString = Object.keys(metadata).length != 0 ? ' - ' + JSON.stringify(metadata) : '';
    const requestIDString = requestID ? ' request ' + requestID : '';
    const durationString = startTime ? ' ' + (parseInt(process.hrtime.bigint() - startTime) / 1000000) + 'ms' : '';
    return `${timestamp} [${level}]${requestIDString}: ${message}${durationString}${metadataString}`;
    /*
    Log format examples:
    2022-03-09 10:10:15 [info] request 2d8b3ad0-9b58-4c51-a602-49470005a44f: Response GET /health 5.8981ms - {"status":200}
    2022-03-09 10:10:17 [info] request 94719cef-ba7f-44e7-9e47-47ea7900a9cf: Starting GET /questionnaire/:id
    2022-03-09 10:10:17 [debug] request 94719cef-ba7f-44e7-9e47-47ea7900a9cf: Questionnaire ID GET /questionnaire/:id - {"questionnaireId":"62139dc9254e5d607397c689"}
    */
});

const errorFileTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/error/%DATE%.error.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxSize: 100000,
    maxFiles: 10
});

const requestLogger = winston.loggers.add('request-logger', {
    level: process.env.NODE_ENV == 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        printFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: 'logs/request/%DATE%.request.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: 100000,
            maxFiles: 10
        }),
        errorFileTransport
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
        errorFileTransport
    ]
});

module.exports = {requestLogger};