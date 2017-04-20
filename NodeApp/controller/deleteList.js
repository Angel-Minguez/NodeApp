/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/deleteList                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                                //Importamos el modelo de la lista
const userModel = require('../models/userModel.js');                                //Modelo de datos del usuario
const debug = require('debug')('createList');							            //Modulo de mensajes de debug
module.exports.deleteList = function (req, res, next) {
    listModel.list.remove({ _id: req.query.listId }, (err) => {
        if (err) debug('ERROR en el borrado de la lista:', req.query.listId);
        else res.redirect('/home');
    });

}