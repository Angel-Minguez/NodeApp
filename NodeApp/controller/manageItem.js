/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/manageItem                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                                //Importamos el modelo de la lista
const userModel = require('../models/userModel.js');                                //Modelo de datos del usuario
const itemModel = require('../models/itemModel.js');
const manageList = require('../controller/manageList.js');

const debug = require('debug')('manageItem');							            //Modulo de mensajes de debug
//Funcion que acepta y guarda los datos del item en la bd
module.exports.addItem = function (req, res) {
    module.exports.item = new itemModel.item({
        listId : manageList.list._id,    
        itemPriority: req.body.priority,                                            //Prioridad de la tarea
        itemExpireTime: new Date(req.body.time),                                    //Fecha en la que la tarea vence
        itemText: req.body.text,                                                    //Texto de la tarea
        itemArchived: false,                                                        //Tarea activa o archivada
        itemDone: false                                                             //Tarea finalizada o incompleta      
    });
    console.log(module.exports.item);
    console.log(module.exports.item.itemExpireTime);
}