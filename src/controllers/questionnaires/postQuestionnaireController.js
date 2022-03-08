const Questionnaire = require('../../schemas/questionnaireSchema.js');

const {requestLogger} = require('../../logger/logger');

async function postQuestionnaireController(req, res){
    const body = req.body;
    const startTime = process.hrtime.bigint();
    requestLogger.info('Starting POST /questionnaire', {requestID: req.id});
    requestLogger.debug('Body POST /questionnaire', {requestID: req.id, body: body});
    try{
        const questionnaire = await createQuestionnaire(Questionnaire, body);
        if(questionnaire){
            res.status(201).json({data: questionnaire});
            requestLogger.info('Response POST /questionnaire', {requestID: req.id, startTime: startTime, status: 201});
            requestLogger.debug('Quiestionnaire response POST /questionnaire', {requestID: req.id, questionnaire: questionnaire});
        }
        else{
            res.status(400).json({error: 'Bad Request'});
            requestLogger.info('Response POST /questionnaire', {requestID: req.id, startTime: startTime, status: 400});
            requestLogger.debug('Invalid body POST /questionnaire', {requestID: req.id, body: body});
        }
    }
    catch(err){
        res.status(500).json({error: 'Server Error'});
        requestLogger.error('Error POST /questionnaire', {requestID: req.id, startTime: startTime, status: 500, body: body, error: String(err)});
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