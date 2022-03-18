require('dotenv').config();
const mongoose = require('mongoose');


const {requestLogger} = require('./logger/logger');
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