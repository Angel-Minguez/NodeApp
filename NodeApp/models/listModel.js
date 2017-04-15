﻿/***************************************************************************************************************/
/*  Modulo: Modulo dedefinicion del modelo de datos de cada lista                                              */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
var mongoose = require('../config/mongodb.js');     //Cargamos el modulo de configuracion de la base de datos
var listSchema = mongoose.Schema({                  //Esquema del documento usuario
    userName: String,                               //Nombre de usuario
    user_id: Schema.Types.ObjectId,                 //Tipo ID, _id del usuario
    listItems: [Schema.Types.Mixed],                //Elementos de la lista
});
var list = mongoose.model('list', listSchema);      //Creamos el modelo a partir de esquema
module.exports.list = list;                         //Exportamos el modelo