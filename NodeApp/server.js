/**************************************************************/
/*				        Modulo principal                      */
/**************************************************************/
'use strict';
//Inicializacion de Express y otros modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessions = require('express-session');
//Exportamos la instancia de nuestra aplicacion
module.exports.app = app;
//Caso de dependencia circular, router necesita que app haya sido exportada
//Requerimos y añadimos nuestro router a la pila de middleware
var router = require('./router/router.js');
app.use(router);
app.use(bodyParser.json());                         //Parseador en formato json
app.use(bodyParser.urlencoded({extended:true}));    //Parseador de parametros codificados en url
app.use(sessions(global.sessionOptions));
//Servidor de archivos estaticos
app.use(express.static('static'));
//Seleccion del modulo de plantillas
app.set('views', './views'); //Ruta a la carpeta de los templates
app.set('view engine', 'pug'); //Motor que usaremos
app.listen(process.env.PORT);
//http://stackoverflow.com/questions/26626249/update-part-of-a-page-in-jade