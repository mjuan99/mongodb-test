const mongoose = require('mongoose');
const questionnaireSchema = require('../schemas/questionnaireSchema.js');
const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

async function getQuestionnaireController(req, res){
    try{
        const id = req.params.id;
        const questionnaire = await Questionnaire.findById(id);
        if(questionnaire != null)
            res.status(200).json({data: questionnaire});
        else
            res.status(404).send("Not Found");
    }
    catch{
        res.status(500).send("Server Error");
    }
}

module.exports = getQuestionnaireController;