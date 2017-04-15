/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /index                                                                       */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
module.exports = function (req, res, next) {                            //Carga de la pagina de inicio, solo visible para usuarios sin loguear
    if (req.session.views) req.session.views++;                         //Numero de visitas de la sesion, +1 en cada
    else req.session.views = 1;                                         //Si es la primera vez inicializamos el contador
    if (!req.session.user) req.session.user = 'guest';                  //Si no hay usuario definido asignamos uuario invitado
    if (req.session.user === 'guest') res.render('index.pug', { user: req.session.user }); //Si el usuario no esta logueado, mostramos pagna de inicio
         else res.redirect('/home');                                                       //Si lo esta, mostramos su home
}
//Requerido por: /router/router.js