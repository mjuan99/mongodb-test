const router = require('express').Router();

const {authGoogle, authApple, authFacebook, callbackController, errorController, refreshController, logoutController} = require('../controllers/login');


router.get('/auth/google', authGoogle.loginController);
router.get('/auth/google/callback', authGoogle.redirectController, callbackController);

router.get('/auth/apple', authApple.loginController);
router.post('/auth/apple/callback', authApple.redirectController, callbackController);

router.get('/auth/facebook', authFacebook.loginController);
router.get('/auth/facebook/callback', authFacebook.redirectController, callbackController);

router.get('/error', errorController);
router.get('/refresh', refreshController);
router.get('/logout', logoutController);


module.exports = router;