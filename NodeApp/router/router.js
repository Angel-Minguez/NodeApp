/**************************************************************/
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
        console.log(req.session.cookie);
        console.log(req.session.id);
        res.end('<p>hola</p>');
    });
	next(); //Invocamos el siguiente elemento de la pila de middleware  
}