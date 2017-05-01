/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/manageItem                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                                //Importamos el modelo de la lista
const userModel = require('../models/userModel.js');                                //Modelo de datos del usuario
const itemModel = require('../models/itemModel.js');
const hash = require('password-hash'); 
const debug = require('debug')('manageItem');							            //Modulo de mensajes de debug
//Funcion que acepta y guarda los datos del item en la bd
module.exports.addItem = function (req, res) {
  //  var listId = hash

  //  module.exports.item = new itemModel.item {
    //    itemPriority: req.body.priority,                                            //Prioridad de la tarea
     //   itemExpireTime: new Date(req.body.time),                                    //Fecha en la que la tarea vence
     //   itemText: req.body.text,                                                    //Texto de la tarea
      //  list: { type: mongoose.Schema.Types.ObjectId, ref: listModel },   //Id de la lista que la contiene
     //   itemArchived: false,                                                        //Tarea activa o archivada
     //   itemDone: false                                                             //Tarea finalizada o incompleta      
  //  }
  //  console.log(req.body);
}