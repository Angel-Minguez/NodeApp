/***************************************************************************************************************/
/*  Modulo: Opciones de sesion                                                                                 */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict';
const express = require('express');                     //Cargamos el modulo de Express
const app = express();                                  //Creamos la instancia de la aplicacion
module.exports = app;
module.exports.express = express;
//Exportamos la instancia de nuestra aplicacion
const session = require('./config/session.js');         //Cargamos las opciones de las sesiones en nuestra app
const bodyParser = require('./config/bodyParser');      //Cargamos las opciones del modulo de parseo
const auth = require('./controller/authenticator.js');  //Cargamos en el servidor el modulo de autenticacion de requests
const staticSrv = require('./config/staticServer.js');  //Cargamos el servidor de archivos estaticos de Express
const router = require('./router/router.js');           //Requerimos el modulo de ruteo
app.use(router);                                        //Y lo añadimos nuestro router a la pila de middleware
//Seleccion del modulo de plantillas
app.set('views',  __dirname + '/views');                //Ruta a la carpeta de los templates
app.set('view engine', 'pug');                          //Motor que usaremos PUG
app.listen(process.env.PORT);                           //Lanzamos el servidor
//Requerido por: /config/bootScrip