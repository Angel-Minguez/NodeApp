/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /logout                                                                      */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
module.exports = function (req, res, next) {
    req.session.user = 'guest';                         //Cerramos la sesion asignando el usuario invitado
    res.redirect('/login');                             //Redireccionamos a la pagina de login
}
//Requerido por: /router/router.js