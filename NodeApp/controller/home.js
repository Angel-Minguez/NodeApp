/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home                                                                        */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
module.exports = function (req, res, next) {
    res.render('home.pug', { user: req.session.user });
}
//Requerido por: /router/router.js