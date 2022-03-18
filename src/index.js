require('dotenv').config();
const mongoose = require('mongoose');


const {requestLogger} = require('./logger/logger');
requestLogger.debug('Debugging');


const express = require('express');
const requestID = require('express-request-id');
const app = express();
/*const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET
}));*/
app.use(express.json());
app.use(requestID());

const passport = require('passport');

app.use(passport.initialize());
//app.use(passport.session());

const healthRoutes = require('./routes/healthRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const loginRoutes = require('./routes/loginRoutes');
app.use('/health', healthRoutes);
app.use('/questionnaire', questionnaireRoutes);
app.use('/', loginRoutes)


app.listen(process.env.PORT, async () => {
    requestLogger.info('Server starting');
    await mongoose.connect(process.env.DB_URL);
    console.log("Listening in port " + process.env.PORT)
});