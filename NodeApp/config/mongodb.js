/***************************************************************************************************************/
/*  Modulo: Opciones de mongodb                                                                                */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
if (process.env.DB === 'true') {                                                                
    const debug = require('debug')('mongodb');                                                  //Modulo de mensajes de debug
    const mongoose = require('mongoose');						                                //Controlador de la base de datos
    mongoose.connect('mongodb://127.0.0.1/nodeApp');	                                        //Objeto de conexion
    mongoose.connection.on('error', () => debug('Error en la conexion a la base de datos'));    //Manejador del evento error
    mongoose.connection.once('open', () => debug('Conexion con mongodb establecida'));          //Manejador del evento open (solo se ejecutara la primera vez)
    module.exports = mongoose;                                                                  //Exportamos la instancia de mongoose
}
//Requerido por: /config/session.js y /models/userModel.js