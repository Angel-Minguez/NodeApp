/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /index                                                                       */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
module.exports = function (req, res, next) {      //Carga de la pagina de login
    res.redirect('/home');
}
//Requerido por: /router/router.js