/**************************************************************/
/*				        Modulo principal                      */
/**************************************************************/
'use strict';
//Inicializacion de Express y otros modulos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessions = require('express-session');
//Opciones de la sesion
let sessionOptions;
if (app.get('env') === 'developement') sessionOptions = {
    secret: 'mi secreto',
    saveUninitialized: false,
    store: undefined,
    cookie: {
        domain: '127.0.0.1',
        maxAge: 1000 * 60 * 60  //1 hora
    } 
};
else sessionOptions = {
    secret: 'mi secreto',
    saveUninitialized: false,
    store: undefined,
    cookie: {
        domain: '127.0.0.1',
        secure: true,
        maxAge: 1000 * 60 * 15  //15 minutos
    }
};
//Modulos para manejo de la BD
if (process.env.DB === 'true') {                                    //Comprobamos si MongoDB esta habilitado
    const mongoStore = require('connect-mongo')(sessions); 	        //Asociamos controlador de sesiones y almacenamiento
    const mongoose = require('mongoose');						    //Controlador de la base de datos
    mongoose.connect('mongodb://127.0.0.1/nodeApp');	            //Objeto de conexion
    var db = mongoose.connection;
    db.on('error', () => console.log('Error durante la conexion a la base de datos'));
    db.once('open', () => console.log('Conexion con mongodb establecida'));
    module.exports.mongo = mongoose;                                   //Exportamos la instancia de mongoose
    //Almacenamiento en mongodb usando la conexion de mongoose
    sessionOptions.store = new mongoStore({ mongooseConnection: mongoose.connection }); 
} else sessionOptions.store = sessions.Store();                     //Almacenamiento en memoria
//Exportamos la instancia de nuestra aplicacion y de la base de datos
module.exports.app = app;
//Caso de dependencia circular, router necesita que app haya sido exportada
//Requerimos y añadimos nuestro router a la pila de middleware
var router = require('./router/router.js');
app.use(router);
app.use(bodyParser.json());                         //Parseador en formato json
app.use(bodyParser.urlencoded({extended:true}));    //Parseador de parametros codificados en url
app.use(sessions(sessionOptions));			        //Controlador de sesiones
//Servidor de archivos estaticos
app.use('public', express.static('static'));
//Seleccion del modulo de plantillas
app.set('views', './views'); //Ruta a la carpeta de los templates
app.set('view engine', 'pug'); //Motor que usaremos
app.listen(process.env.PORT);