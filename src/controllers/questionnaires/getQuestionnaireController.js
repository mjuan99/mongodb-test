const mongoose = require('mongoose');
const Questionnaire = require('../../schemas/questionnaireSchema.js');

async function getQuestionnaireController(req, res){
    try{
        const id = req.params.id;
        let questionnaire = null;
        if(mongoose.Types.ObjectId.isValid(id)){
            questionnaire = await findQuestionnaire(Questionnaire, id);
            if(questionnaire != null)
                res.status(200).json({data: questionnaire});
            else
                res.status(404).json({error: 'Not Found'});
        }else
            res.status(400).json({error: 'Bad Request'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Server Error'});
    }
}

async function findQuestionnaire(questionnaireModel, questionnaireId){
    return await questionnaireModel.findById(questionnaireId, 'date sleep training organizationTime screenUsage drinks _id');
}

module.exports = {getQuestionnaireController, findQuestionnaire};