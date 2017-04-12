/**************************************************************/
/*				        Modulo router                         */
/**************************************************************/
//Importamos la instancia de Express
var app = require('../server.js').app;
//Cargamos el controlador
var controller = require('../controller/controller.js');
//Objeto router
module.exports = function (req, res, next) {
	app.get('/', controller.index);
    app.get('/login', controller.userLogin);
    app.post('/login_form', controller.userLoginForm);
	app.get('/register', controller.userRegister);
    app.post('/register_form', controller.userRegisterForm);
	app.get('/home', controller.userHome);
	app.get('/home/logout', controller.userLogout);
	next(); //Invocamos el siguiente elemento de la pila de middleware  
}