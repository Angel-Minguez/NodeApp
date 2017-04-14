/***************************************************************************************************************/
/*  Modulo: Modulo dedefinicion del modelo de datos de usuario                                                 */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
var mongoose = require('../config/mongodb.js');     //Cargamos el modulo de configuracion de la base de datos
var userSchema = mongoose.Schema({                  //Esquema del documento usuario
    userName: String,                               //Nombre de usuario
    userPassword: String,                           //Hash de password
    userEmail: String                               //Email
});
var user = mongoose.model('user', userSchema);      //Creamos el modelo a partir de esquema
module.exports.user = user;                         //Exportamos el modelo