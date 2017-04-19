/***************************************************************************************************************/
/*  Modulo: Modulo dedefinicion del modelo de datos de cada lista                                              */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
var mongoose = require('../config/mongodb.js');     //Cargamos el modulo de configuracion de la base de datos
var listSchema = mongoose.Schema({                  //Esquema del documento usuario
    userName: String,                               //Nombre de usuario
    user_id: mongoose.Schema.Types.ObjectId,        //Tipo ID, _id del usuario
    listCat: String,								//Categoria a la que pertenece la lista						
	listTitle: String,                              //Titulo de la lista
    listItems: [mongoose.Schema.Types.Mixed],       //Elementos de la lista
    listCreationTime: String,                       //Fecha de la creacion de la lista
});
var list = mongoose.model('list', listSchema);      //Creamos el modelo a partir de esquema
module.exports.list = list;                         //Exportamos el modelo