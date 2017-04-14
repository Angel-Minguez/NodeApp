/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /register y /registerform                                                    */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const userModel = require('../models/userModel');               //Modelo de datos del usuario
const debug = require('debug')('register');                     //Modulo de mensajes de debug
const passwordHash = require('password-hash');                  //Modulo de hasheo para passwords
//Funcion de control de /register
module.exports.userRegister = function (req, res, next) {   
    if (req.session.user !== 'guest') res.redirect('/login');   //Si el usuario esta logueado o no esta definido por algun motivo se le redireciona a la pagina de login
    res.render('register.pug', {});                             //Renderizamos la vista
}
//Funcion de control del formulario de registro
module.exports.userRegisterForm = function (req, res, next) {
    let userInfo = {                                                                            //Objeto que recibe el post AJAX del formulario
        username: req.body.campo1,
        password: req.body.campo2,
        email: req.body.campo3,
        session: req.session.id,                                                                //Temporal, mostramos la id de la sesion
        userStatus: 'undefined'                                                                 //Propiedad para responder con el exito o el tipo de error  
    };
    function validateUser(userInfo, callback) {                                                 //Funcion de validacion del usuario asincrona
        userModel.user.findOne({ userName: userInfo.username }, (err, _user) => {               //Buscamos el nombre por si estuviera repetido
            if (err) debug('Error en user.findOne userName: ', userInfo.username);              //Error en la busqueda en la bd
            else if (_user) {                                                                   //Si el nombre ya existe en la bd
                debug('ERROR: usuario duplicado:', _user);                                      //Mostramos el error 
                userInfo.userStatus = 'Nombre de usuario en uso';                               //Actualizamos el objeto de usuario con la informacio del error              
                res.send(userInfo);                                                             //Enviamos el mensaje de error a la vista via respuesta al post AJAX
            } else {                                                                            //Si el nombre de usuario no existe
               userModel.user.findOne({ userEmail: userInfo.email }, (err, _user) => {          //Buscamos si el email esta duplicado
                    if (err) debug('Error en user.findOne useremail: ', userInfo.email);        //Error en la busqueda en la bd
                    else if (_user) {                                                           //Si el email esta duplicado
                        debug('ERROR: email duplicado:', _user);                                //Mostramos el error
                        userInfo.userStatus = 'Email de usuario en uso';                        //Actualizamos el objeto de usuario con la informacio del error  
                        res.send(userInfo);                                                     //Enviamos el mensaje de error a la vista via respuesta al post AJAX
                    } else callback(userInfo);                                                  //Si todo el registro ha tenido exito, se llama al callback
               });
             }
        });
    }
    validateUser(userInfo, (_user) => {                                                   //Invocamos la funcion validacion del usuario
        userInfo.password = passwordHash.generate(req.body.campo2);                       //Generamos hash del password
        var newUser = new userModel.user({                                                //Creamos un nuevo documento del modelo de usuario
            userName: userInfo.username,
            userPassword: userInfo.password,
            userEmail: userInfo.email
        });
        newUser.save((err) => {                                                           //Lo guardamos en la bd
            if (err) {                                                                    //En caso de error en el guardado
                debug('Error almacenando usuario');                                       //Mostramos el mensaje
                userInfo.userStatus = 'Error almacenando informacion de usuario';         //Actualizamos el objeto de usuario con la informacio del error
                res.send(userInfo);                                                       //Enviamos el mensaje de error a la vista via respuesta al post AJAX
            }
            else {                                                                        //En caso de exito en el guardado
                debug('Usuario creado con exito');                                        //Mostramos el mensaje
                userInfo.userStatus = 'Usuario creado con exito';                         //Actualizamos el objeto de usuario con la informacio del error
                res.send(userInfo);                                                       //Enviamos el mensaje de error a la vista via respuesta al post AJAX
            }
        });

    });
}
//Requerido por: /router/router.js