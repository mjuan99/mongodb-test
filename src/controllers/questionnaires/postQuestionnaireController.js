const mongoose = require('mongoose');
const Questionnaire = require('../../schemas/questionnaireSchema.js');

const winston = require('winston');
const requestLogger = winston.loggers.get('request-logger');

async function postQuestionnaireController(req, res){
    const body = req.body;
    requestLogger.info('Starting POST /questionnaire', {body: body});
    try{
        const questionnaire = await createQuestionnaire(Questionnaire, body);
        if(questionnaire){
            res.status(201).json({data: questionnaire});
            requestLogger.info('Response POST /questionnaire', {status: 201, questionnaire: questionnaire});
        }
        else{
            res.status(400).json({error: 'Bad Request'});
            requestLogger.info('Response POST /questionnaire', {status: 400, body: body})
        }
    }
    catch(err){
        res.status(500).json({error: 'Server Error'});
        requestLogger.error('Response POST /questionnaire', {status: 500, body: body, error: String(err)});
    }
}

async function createQuestionnaire(questionnaireModel, questionnaireData){
    const questionnaire = new questionnaireModel(questionnaireData);
    if(questionnaire.validateSync() == undefined)
        return await questionnaire.save();
    else
        return null;
}

module.exports = {postQuestionnaireController, createQuestionnaire};