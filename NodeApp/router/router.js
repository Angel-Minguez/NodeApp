/**************************************************************/
/*				        Modulo router                         */
/**************************************************************/
//Importamos la instancia de Express
var app = require('../server.js').app;
//Cargamos el controlador
var controller = require('../controller/controller.js');
//Objeto router
module.exports = function (req, res, next) {
    app.get('/', controller.userLoginScreen);
	app.get('/register', controller.userRegistration);
	app.post('/registerEval', controller.userRegistrationEval)
    app.post('/form1', controller.userLogin);
	next(); //Invocamos el siguiente elemento de la pila de middleware  
}