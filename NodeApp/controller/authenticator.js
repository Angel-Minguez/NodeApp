/**************************************************************/
/*				      Modulo autenticador                     */
/**************************************************************/
'use strict'
const debug = require('debug')('authenticator');
module.exports = function(req, res, next) {
	debug('USER:',req.session.user);
	debug('URL:',req.url);
	if (!req.session.user && req.url !== '/login'&& req.url !== '/login_form') {
		req.session.user = 'guest';
        res.redirect('/login');
        debug('Redirectioning... from: ', req.url);
	}
    else if (req.session.user === 'guest' && req.url !== '/login' && req.url !== '/login_form') {
        res.redirect('/login');
        debug('Redirectioning... from: ', req.url);
    }
		else next()
}