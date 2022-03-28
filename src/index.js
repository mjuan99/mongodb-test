require('dotenv').config();
const mongoose = require('mongoose');


const {requestLogger} = require('./logger/logger');
requestLogger.debug('Debugging');


const express = require('express');
const requestID = require('express-request-id');
const app = express();
app.use(express.json());
app.use(requestID());
const passport = require('passport');
app.use(passport.initialize());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


const healthRoutes = require('./routes/healthRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const loginRoutes = require('./routes/loginRoutes');
app.use('/health', healthRoutes);
app.use('/questionnaire', questionnaireRoutes);
app.use('/', loginRoutes);

const https = require('https');
const fs = require('fs');

https.createServer({
        key: fs.readFileSync(process.env.HTTPS_KEY_LOCATION),
        cert: fs.readFileSync(process.env.HTTPS_CERT_LOCATION)
    }, 
    app)
    .listen(process.env.PORT, async () => {
        requestLogger.info('Server starting');
        await mongoose.connect(process.env.DB_URL);
        console.log("Listening in port " + process.env.PORT);
    }
);
