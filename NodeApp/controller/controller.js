/**************************************************************/
/*				      Modulo controlador                      */
/**************************************************************/
var model = require('../models/userModel');
//Carga de la pagina de login
module.exports.index = function (req, res, next) {
    res.redirect('/login');
}
module.exports.userLogin = function (req, res, next) {
	if (req.session.views) req.session.views++;
    else req.session.views = 1;
    res.render('login.pug', { views: req.session.views, sid: req.session.id });
}
//Logica de logueo
module.exports.userLoginForm = function(req,res,next) {
	let loginResult='OK!';
    //Busqueda BD 
    res.end(loginResult);
}
//Registro de usuario
module.exports.userRegister = function (req,res,next) {
	res.render('register.pug', {});
}
module.exports.userRegisterForm = function (req,res,next) {
	/*model.user.create({userId: undefined, 
						userName: req.body.campo1,
						password: req.body.campo2,
						email: req.body.campo3});
    console.log(req.body.user);*/
    res.end('test');
}