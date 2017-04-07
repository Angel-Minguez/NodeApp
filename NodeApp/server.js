/**************************************************************/
/*				        Modulo principal                      */
/**************************************************************/
'use strict';
//Inicializacion de Express y otros modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessions = require('express-session');
const mongoStore = require('connect-mongo')(sessions); 		//Asociamos controlador de sesiones y almacenamiento
const mongoose = require('mongoose');						//Controlador de la base de datos
const db = mongoose.connect('mongodb://127.0.0.1/nodeApp');	//Objeto de conexion
//Exportamos la instancia de nuestra aplicacion y de la base de datos
module.exports.app = app;
module.exports.db = mongoose;
//Caso de dependencia circular, router necesita que app haya sido exportada
//Requerimos y añadimos nuestro router a la pila de middleware
var router = require('./router/router.js');
app.use(router);
app.use(bodyParser.json());                         //Parseador en formato json
app.use(bodyParser.urlencoded({extended:true}));    //Parseador de parametros codificados en url
//Opciones de la sesion
var sessionOptions = {};
if (app.get('env') === 'developement') sessionOptions = {
                                                          secret: 'mi secreto', 
                                                          store: /*new mongoStore({ url:'mongodb://127.0.0.1/nodeApp'})*/
																 new mongoStore({ mongooseConnection: mongoose.connection }),
							                              saveUninitialized: false, 
                                                          cookie: {
								                                domain: '127.0.0.1', 
								                                maxAge: 1000*60*60 } //1 hora
							                            };
else sessionOptions = {
						secret: 'mi secreto', 
						cookie: {
							secure : true }
};
app.use(sessions(sessionOptions));			        //Controlador de sesiones
//Servidor de archivos estaticos
app.use(express.static('static'));
//Seleccion del modulo de plantillas
app.set('views', './views'); //Ruta a la carpeta de los templates
app.set('view engine', 'pug'); //Motor que usaremos
app.listen(process.env.PORT);
