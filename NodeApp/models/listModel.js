﻿/***************************************************************************************************************/
/*  Modulo: Modulo dedefinicion del modelo de datos de cada lista                                              */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
var mongoose = require('../config/mongodb.js');                     //Cargamos el modulo de configuracion de la base de datos
var itemModel = require('./itemModel.js')
var listSchema = mongoose.Schema({                                  //Esquema del documento usuario
    userName: String,                                               //Nombre de usuario
    user_id: mongoose.Schema.Types.ObjectId,                        //Tipo ID, _id del usuario
    listCat: String,								                //Categoria a la que pertenece la lista						
    listTitle: String,                                              //Titulo de la lista
    listCreationTitle: String,                                      //Titulo con el que la lista fue creada                    
    listItems: [{ type:mongoose.Schema.Types.ObjectId, ref: itemModel}],  //Elementos de la lista
    listCreationTime: String,                                       //Fecha de la creacion de la lista
	//itemCount: Number
});
var list = mongoose.model('list', listSchema);                      //Creamos el modelo a partir de esquema
module.exports.list = list;                                         //Exportamos el modelo