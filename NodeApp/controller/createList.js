/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/createList                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                    //Importamos el modelo de la lista
const userModel = require('../models/userModel');                       //Modelo de datos del usuario
const debug = require('debug')('createList');
//Funcion de carga de la pantalla de creacion de lista
module.exports.createList = function (req, res, next) {
    userModel.user.findOne({ 'userName': req.session.user }, (err, _user) => {
        if (err) debug('Error en user.findOne userName: ', req.session.user);
        else if (!_user) debug('ERROR: usuario no encontrado:', req.session.user);
            else {
                module.exports.list = new listModel.list({
                    userName: req.session.user,                         //Nombre de usuario
                    user_id: _user._id,                                 //ID del usuario
                    listItems: [],                                      //Elementos de la lista
                    listCreationTime: 'undefined',                      //Fecha de la creacion de la lista
                    listNumber: 'undefined'
                });
             }
    });
    res.render('createList.pug', { user: req.session.user });
}
module.exports.addListItem = function (req, res) {
   
    if (req.body.campo1) {
         module.exports.list.listItems.push(req.body.campo1);
    }
    var listItemText = '<div id="list_item_' + module.exports.list.user_id + '">' + req.body.campo1 + '</div>';
    console.log(module.exports.list.userName);
    console.log(module.exports.list.listItems);
    res.send(listItemText);
}

//Requerido por: /router/router.js