/***************************************************************************************************************/
/*  Modulo: Opciones del parseador de bodies                                                                   */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
var app = require('../server.js');                      //Requerimos la instancia de la aplicacion
const bodyParser = require('body-parser');              //Cargamos el modulo de parseo
app.use(bodyParser.json());                             //Añadimos el parseador en formato json
app.use(bodyParser.urlencoded({ extended: true }));     //Añadimos el parseador de parametros codificados en url
//Requerido por: /server.js