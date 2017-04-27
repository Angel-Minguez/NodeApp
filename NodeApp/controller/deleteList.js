/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/deleteList                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                                //Importamos el modelo de la lista
const userModel = require('../models/userModel.js');                                //Modelo de datos del usuario
const debug = require('debug')('createList');							            //Modulo de mensajes de debug
//Funcion de borrado de una lista
module.exports.deleteList = function (req, res, next) {
    listModel.list.remove({ listTitle: req.query.name, listCat: req.query.cat }, (err) => {
        if (err) debug('ERROR en el borrado de la lista:', req.query.name);
        else res.end();
    });
}