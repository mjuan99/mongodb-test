const mongoose = require('mongoose');
const Questionnaire = require('../schemas/questionnaireSchema.js');

async function postQuestionnaireController(req, res){
    try{
        const questionnaire = await createQuestionnaire(Questionnaire, req.body);
        if(questionnaire)
            res.status(201).json({data: questionnaire});
        else
            res.status(400).send("Bad Request");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error");
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