/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /router                                                                      */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
var app = require('../server.js');                  //Importamos la instancia de Express
module.exports = function (req, res, next) {        //Funcion de routeo de requests
    app.get('/', require('../controller/index.js'));
    app.get('/login', require('../controller/login.js').userLogin);
    app.post('/login_form', require('../controller/login.js').userLoginForm);
    app.get('/register', require('../controller/register.js').userRegister);
    app.post('/register_form', require('../controller/register.js').userRegisterForm);
    app.get('/home', require('../controller/home.js'));
    app.get('/logout', require('../controller/logout.js'));
	next();    //Invocamos el siguiente elemento de la pila de middleware  
}
//Requerido por: /server.js