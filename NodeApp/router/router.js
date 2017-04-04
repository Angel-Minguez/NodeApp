/**************************************************************/
/*				        Modulo router                         */
/**************************************************************/
//Importamos la instancia de Express
var app = require('../server.js');
//Cargamos el controlador
var controller = require('../controller/controller.js');
//Objeto router
module.exports = function (req, res, next) {
    app.use('/', controller.userLogin);
	next(); //Invocamos el siguiente elemento de la pila de middleware  
}