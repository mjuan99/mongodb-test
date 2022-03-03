require('dotenv').config();
const mongoose = require('mongoose');


const express = require("express");
const app = express();
app.use(express.json());

const healthRoutes = require('./routes/healthRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
app.use('/health', healthRoutes);
app.use('/questionnaire', questionnaireRoutes);


app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("Listening in port " + process.env.PORT)
});