/**************************************************************/
/*				      Modulo autenticador                     */
/**************************************************************/
'use strict'
module.exports = function(req, res, next) {
	console.log('aut:',req.session.user);
	console.log('aut:',req.url);
	if (!req.session.user && req.url !== '/login'&& req.url !== '/login_form') {
		req.session.user = 'guest';
		res.redirect('/login');	
	}
	else if (req.session.user === 'guest' && req.url !== '/login' && req.url !== '/login_form') res.redirect('/login');
		else next()
}