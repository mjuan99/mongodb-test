const router = require('express').Router();
const {postQuestionnaireController} = require('../controllers/postQuestionnaireController.js');
const {getQuestionnaireController} = require('../controllers/getQuestionnaireController.js');


router.post("/", postQuestionnaireController);
router.get("/:id", getQuestionnaireController);


module.exports = router;