const mongoose = require('mongoose');
const Questionnaire = require('../../schemas/questionnaireSchema.js');

const winston = require('winston');
const requestLogger = winston.loggers.get('request-logger');

async function getQuestionnaireController(req, res){
    const id = req.params.id;
    requestLogger.info('Starting GET /questionnaire/:id', {questionnaireId: id});
    try{
        if(mongoose.Types.ObjectId.isValid(id)){
            const questionnaire = await findQuestionnaire(Questionnaire, id);
            if(questionnaire != null){
                res.status(200).json({data: questionnaire});
                requestLogger.info('Response GET /questionnaire/:id', {status: 200, questionnaireId: id, questionnaire: questionnaire});
            }
            else{
                res.status(404).json({error: 'Not Found'});
                requestLogger.info('Response GET /questionnaire/:id', {status: 404,questionnaireId: id});
            }
        }else{
            res.status(400).json({error: 'Bad Request'});
            requestLogger.info('Response GET /questionnaire/:id', {status: 400, questionnaireId: id});
        }
    }
    catch(err){
        res.status(500).json({error: 'Server Error'});
        requestLogger.error('Response GET /questionnaire/:id', {status: 500, questionnaireId: id, error: String(err)});
    }
}

async function findQuestionnaire(questionnaireModel, questionnaireId){
    return await questionnaireModel.findById(questionnaireId, 'date sleep training organizationTime screenUsage drinks _id');
}

module.exports = {getQuestionnaireController, findQuestionnaire};