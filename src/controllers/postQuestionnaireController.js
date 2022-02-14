const mongoose = require('mongoose');
const questionnaireSchema = require('../schemas/questionnaireSchema.js');
const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

async function postQuestionnaireController(req, res){
    try{
        const newQuestionnaire = new Questionnaire(req.body);
        if(newQuestionnaire.validateSync() == undefined){
            const savedQuestionnaire = await newQuestionnaire.save();
            res.status(201).json({data: savedQuestionnaire});
        }
        else
            res.status(400).send("Bad Request");
    }
    catch{
        res.status(500).send("Server Error");
    }
}

module.exports = postQuestionnaireController;