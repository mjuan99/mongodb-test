const router = require('express').Router();
const {getQuestionnaireController, postQuestionnaireController} = require('../controllers/questionnaires');
const {authenticateToken} = require('../tokens/authenticationMiddleware');


router.post("/", authenticateToken, postQuestionnaireController);
router.get("/:id", authenticateToken, getQuestionnaireController);


module.exports = router;