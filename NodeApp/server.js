/**************************************************************/
/*				        Modulo principal                      */
/**************************************************************/
'use strict';
//Inicializacion de Express y otros modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessions = require('express-session');
const mongoStore = require('connect-mongo');
//Exportamos la instancia de nuestra aplicacion
module.exports.app = app;
//Caso de dependencia circular, router necesita que app haya sido exportada
//Requerimos y añadimos nuestro router a la pila de middleware
var router = require('./router/router.js');
app.use(router);
app.use(bodyParser.json());                         //Parseador en formato json
app.use(bodyParser.urlencoded({extended:true}));    //Parseador de parametros codificados en url
mongoStore(sessions);								//Asociamos controlador y almacenamiento
app.use(sessions(global.sessionOptions));			//Controlador de sesiones
//Opciones de la sesion
if (process.env.NODE_ENV === 'developement')
	global.sessionOptions = {secret: 'mi secreto', 
							 store: new mongoStore(),
							 saveUninitialized: false, 
							 cookie:{
								 domain: '127.0.0.1', 
								 maxAge: 1000*60*60
								 }
							};
else global.sessionOptions = {
							secret: 'mi secreto', 
							cookie:{
								secure : true
								}
							};
//Servidor de archivos estaticos
app.use(express.static('static'));
//Seleccion del modulo de plantillas
app.set('views', './views'); //Ruta a la carpeta de los templates
app.set('view engine', 'pug'); //Motor que usaremos
app.listen(process.env.PORT);
//http://stackoverflow.com/questions/26626249/update-part-of-a-page-in-jade