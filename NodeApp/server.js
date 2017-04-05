/**************************************************************/
/*				        Modulo principal                      */
/**************************************************************/
'use strict';
//Inicializacion de Express y otros modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//Exportamos la instancia de nuestra aplicacion
module.exports.app = app;
//Caso de dependencia circular, router necesita que app haya sido exportada
//Requerimos y añadimos nuestro router a la pila de middleware
var appRouter = require('./router/router.js');
app.use(appRouter);
app.use(bodyParser.json());                         //Parseador en formato json
app.use(bodyParser.urlencoded({extended:true}));    //Parseador de parametros codificados en url
app.listen(process.env.PORT);
//Servidor de archivos estaticos
app.use(express.static('static'));
//Seleccion del modulo de plantillas
app.set('views', './views'); //Ruta a la carpeta de los templates
app.set('view engine', 'pug'); //Motor que usaremos
