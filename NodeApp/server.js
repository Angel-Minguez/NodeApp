/**************************************************************/
/*				        Modulo principal                      */
/**************************************************************/
'use strict';
//Inicializacion de Express
const express = require('express');
const app = express();
//Exportamos la instancia de nuestra aplicacion
module.exports = app;
//Requerimos y añadimos nuestro router a la pila de middleware
//Caso de dependencia circular, router necesita que app haya sido exportada
var router = require('./router/router.js');
app.use(router);
app.listen(process.env.PORT);
//Servidor de archivos estaticos
app.use(express.static('static'));
//Seleccion del modulo de plantillas
app.set('views', './views'); //Ruta a la carpeta de los templates
app.set('view engine', 'pug'); //Motor que usaremos
