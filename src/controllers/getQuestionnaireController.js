const mongoose = require('mongoose');
const Questionnaire = require('../schemas/questionnaireSchema.js');

async function getQuestionnaireController(req, res){
    try{
        const questionnaire = await findQuestionnaire(Questionnaire, req.params.id);
        if(questionnaire != null)
            res.status(200).json({data: questionnaire});
        else
            res.status(404).send("Not Found");
    }
    catch{
        res.status(500).send("Server Error");
    }
}

async function findQuestionnaire(questionnaireModel, questionnaireId){
    return await questionnaireModel.findById(questionnaireId, 'date sleep training organizationTime screenUsage drinks _id');
}

module.exports = {getQuestionnaireController, findQuestionnaire};