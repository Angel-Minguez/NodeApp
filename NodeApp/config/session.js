/***************************************************************************************************************/
/*  Modulo: Opciones de sesion                                                                                 */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const debug = require('debug')('sessionOptions');                   //Modulo de debugeo
const sessions = require('express-session');                        //Modulo controlador de sesiones
const db = require('./mongodb.js');                                 //Opciones e instancia de la base de datos
const app = require('../server.js');                                //Instancia de la aplicacion
let sessionOptions;
if (app.get('env') === 'developement') sessionOptions = {
    secret: 'mi secreto',
    saveUninitialized: false,
    store: undefined,
    cookie: {
        domain: '127.0.0.1',    //Agregar a opciones
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
if (process.env.DB === 'true') {                                                  //Comprobamos si MongoDB esta habilitado
    const mongoStore = require('connect-mongo')(sessions); 	                      //Asociamos controlador de sesiones y almacenamiento
    sessionOptions.store = new mongoStore({ mongooseConnection: db.connection }); //Almacenamiento de sesiones en mongodb usando la conexion de mongoose
} else sessionOptions.store = sessions.Store();                                   //Almacenamiento en memoria
app.use(sessions(sessionOptions));			                                      //Agregamos el controlador de sesiones al servidor y aplicamos las opciones
//Requerido por: /server.js