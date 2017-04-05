﻿/**************************************************************/
/*				        Modulo router                         */
/**************************************************************/
//Importamos la instancia de Express
var app = require('../server.js').app;
//Cargamos el controlador
var controller = require('../controller/controller.js');
//Objeto router
module.exports = function (req, res, next) {
    app.get('/', controller.userLogin);
    app.post('/form1', (req, res) => {
        console.log(req.body.campo1);
    });
	next(); //Invocamos el siguiente elemento de la pila de middleware  
}