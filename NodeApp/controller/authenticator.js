/***************************************************************************************************************/
/*  Modulo: Autentificador de las peticiones                                                                   */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const app = require('../server.js');                            //Importamos la instancia de la aplicacion
const debug = require('debug')('authenticator');                //Añadimos el modulo de mensajes de depuracion
//Funcion autenticadora
module.exports = function authRequest (req, res, next) {
	debug('USER:', req.session.user);                           //Mostramos el usuario de la sesion
	debug('URL:', req.url);                                     //Y la ruta de la request
	if (!req.session.user) {                                    //Si no existe el usuario en la sesion
		req.session.user = 'guest';                             //Lo creamos como invitado
        res.redirect('/login');                                 //Y lo redirigimos a la pagina de logueo
        debug('Redirectioning... from: ', req.url);
	}
    else if (req.session.user === 'guest') {                    //Si es un usuario no logeado
        res.redirect('/login');                                 //Lo redirigimos a la pagina de login si intenta acceder a otra ruta
        debug('Redirectioning... from: ', req.url);
    }
		else next()                                             //Invocamos a la siguiente funcion de middleware
}
app.use('/home', module.exports);                               //Añadimos el autenticador a la pila de middleware
//Requerido por: /server.js