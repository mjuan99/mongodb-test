const {authGoogleController, authGoogleRedirectController, authGoogleCallbackController, authGoogleErrorController} = require('./authGoogleController');
const {refreshController} = require('./refreshController');
const {logoutController} = require('./logoutController');

module.exports = {authGoogleController, authGoogleRedirectController, authGoogleCallbackController, authGoogleErrorController, refreshController, logoutController};