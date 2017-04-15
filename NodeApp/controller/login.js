/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /login y /loginform                                                          */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const debug = require('debug')('login');                                                //Modulo de mensajes de debug
const passwordHash = require('password-hash');                                          //Modulo de hasheo para passwords
var userModel = require('../models/userModel');                                         //Modelo de datos del usuario
 //Funcion de carga de la pagina de login
module.exports.userLogin = function (req, res, next) {                                 
    res.render('login.pug', { views: req.session.views, sid: req.session.id });
}
//Logica de logueo y validacion de la informacion de login
module.exports.userLoginForm = function (req, res, next) {                              //Funcion controladora del form de login
    let userInfo = { userName: req.body.campo1, password: req.body.campo2 };            //Capturamos la request AJAX del formulario
    var loginPromise = new Promise((resolve, reject) => {                               //Promesa para busqueda asincrona en la bd
        userModel.user.findOne({ userName: userInfo.userName }, (err, _user) => {       //Buscamos al usuario en la bd por su nombre
            if (err) {
                debug('Error en user.findOne userName: ', userInfo.userName);           
                reject(Error('Error en user.findOne'));                                 //Si existe error rechazamos la promesa
            }
            else if (_user) {                                                                       //Si encontramos al nombre de usuario en la bd
                if (passwordHash.verify(userInfo.password, _user.userPassword)) resolve('LoginOK'); //Validamos el hash de su contraseña
                else reject(Error('Password invalida'));                                            //Si no coincide rechazamos la promesa
            }
        });
    });
    loginPromise.then((result) => {                                                     //Desencadenante de la promesa con exito
        req.session.user = userInfo.userName;                                           //Actualizamos sesion con el nombre de usuario
        res.end(result);                                                                //Enviamos mensaje de OK a la vista via respuesta al post AJAX
    },
        (err) => {                                                                      //Desencadenante de la promesa con fracaso
            req.session.user = 'guest';                                                 //Actualizamos sesion con tipo invitado
            res.end(err.message);                                                       //Enviamos el mensaje de error a la vista via respuesta al post AJAX
        });
}
//Requerido por: /router/router.js