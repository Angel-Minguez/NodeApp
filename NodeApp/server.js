/***************************************************************************************************************/
/*  Modulo: Opciones de sesion                                                                                 */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict';
const express = require('express');                     //Cargamos el modulo de Express
const app = express();                                  //Creamos la instancia de la aplicacion
module.exports = app;                                   //Exportamos la instancia de nuestra aplicacion
const sessions = require('./config/session.js');        //Cargamos las opciones de las sesiones en nuestra app
const bodyParser = require('./config/bodyParser');      //Cargamos las opciones del modulo de parseo
const auth = require('./controller/authenticator.js');  //Cargamos en el servidor el modulo de autenticacion de requests
const router = require('./router/router.js');           //Requerimos el modulo de ruteo
app.use(router);                                        //Y lo añadimos nuestro router a la pila de middleware
//Servidor de archivos estaticos
app.use('/favicon.ico', express.static(__dirname + '/static/favicon.ico'));
//Seleccion del modulo de plantillas
app.set('views',  __dirname + '/views');            //Ruta a la carpeta de los templates
app.set('view engine', 'pug');                      //Motor que usaremos PUG
app.listen(process.env.PORT);                       //Lanzamos el servidor
//Requerido por: /config/bootScrip