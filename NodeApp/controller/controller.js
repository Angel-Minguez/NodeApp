/**************************************************************/
/*				      Modulo controlador                      */
/**************************************************************/
var model = require('../model/userModel');
//Carga de la pagina de login
module.exports.userLoginScreen = function (req, res, next) {
	if (req.session.views) req.session.views++;
	else req.session.views=1;
	res.render('index.pug', {sessionInfo:req.session.views, sid:req.session.id});
	console.log(req.session.views);
    console.log(req.session.id);
}
//Logica de logueo
module.exports.userLogin = function(req,res,next) {
	let loginResult;
		
	
	res.end(loginResult)
}
//Registro de usuario
module.exports.userRegistration = function (req,res,next) {
	res.render('registration.pug', {});
}
module.exports.userRegistrationEval = function (req,res,next) {
	model.user.create({userId: undefined, 
						userName: req.body.campo1,
						password: req.body.campo2,
						email: req.body.campo3});
	console.log(req.body.user);
}