const router = require('express').Router();
const getHealthController = require('../controllers/getHealthController.js');


router.get("/", getHealthController);


module.exports = router;