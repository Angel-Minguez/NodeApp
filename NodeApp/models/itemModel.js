/***************************************************************************************************************/
/*  Modulo: Modulo dedefinicion del modelo de datos de los items de las listas                                 */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
var mongoose = require('../config/mongodb.js');                 //Cargamos el modulo de configuracion de la base de datos
var listModel = require('./listModel.js');
var itemSchema = mongoose.Schema({                              //Esquema del documento usuario				             
    itemPriority: String,                                       //Prioridad de la tarea
    itemExpireTime: Date,                                       //Fecha en la que la tarea vence
    itemText: String,                                           //Texto de la tarea
    listId: { type: mongoose.Schema.Types.ObjectId, ref: listModel },   //Id de la lista que la contiene
    itemArchived: Boolean,                                      //Tarea activa o archivada
    itemDone: Boolean,                                          //Tarea finalizada o incompleta
    itemOrder: Number
});
var item = mongoose.model('item', itemSchema);                  //Creamos el modelo a partir de esquema
module.exports.item = item;                                     //Exportamos el modelo