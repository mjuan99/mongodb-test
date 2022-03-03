const router = require('express').Router();
const {getQuestionnaireController, postQuestionnaireController} = require('../controllers/questionnaires');


router.post("/", postQuestionnaireController);
router.get("/:id", getQuestionnaireController);


module.exports = router;