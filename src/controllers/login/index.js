const authGoogle = require('./authGoogleController');
const authApple = require('./authAppleController');
const authFacebook = require('./authFacebookController');
const {callbackController} = require('./callbackController');
const {errorController} = require('./errorController');
const {refreshController} = require('./refreshController');
const {logoutController} = require('./logoutController');

module.exports = {authGoogle, authApple, authFacebook, callbackController, errorController, refreshController, logoutController};