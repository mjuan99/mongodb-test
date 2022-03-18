const router = require('express').Router();

const {authGoogleController, authGoogleRedirectController, authGoogleCallbackController, authGoogleErrorController, refreshController, logoutController} = require('../controllers/login');

router.get('/auth/google', authGoogleController);
router.get('/auth/google/callback', authGoogleRedirectController, authGoogleCallbackController);
router.get('/auth/google/error', authGoogleErrorController);
router.get('/refresh', refreshController);
router.get('/logout', logoutController);

module.exports = router;