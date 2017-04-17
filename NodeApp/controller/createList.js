/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/createList                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                    //Importamos el modelo de la lista
const userModel = require('../models/userModel');                       //Modelo de datos del usuario
const debug = require('debug')('createList');							//Modulo de mensajes de debug
//Funcion de carga de la pantalla de creacion de lista
module.exports.createList = function (req, res, next) {
	userModel.user.findOne({ 'userName': req.session.user }, (err, _user) => {     //Buscamos el id del usuario
        if (err) debug('Error en user.findOne userName: ', req.session.user);
        else if (!_user) debug('ERROR: usuario no encontrado:', req.session.user);
            else module.exports.list = new listModel.list({			//Creamos un objeto temporal list donde ir almacenando
				userName: req.session.user,                         //Nombre de usuario
                user_id: _user._id,                                 //ID del usuario
                listItems: [],                                      //Elementos de la lista
                listCreationTime: 'undefined'                       //Fecha de la creacion de la lista
                });    
    });
    res.render('createList.pug', { user: req.session.user });		//Presentamos la pagina de creacion
}
//Funcion para añadir nuevos elementos a la lista
module.exports.addListItem = function (req, res) {   							//Si el item no es una cadena vacia
    if (req.body.campo1)  module.exports.list.listItems.push(req.body.campo1);	//La añadimos a nuestro objeto lista
    let listItemHtml = '<div id="list_item_' + module.exports.list.user_id + '">' + req.body.campo1 + '</div>';
    debug(module.exports.list.userName);
    debug(module.exports.list.listItems);
    res.send(listItemHtml);											//Actualizamos la lista
}
module.exports.saveList = function (req, res) {
	userModel.user.findOne({ 'userName': req.session.user }, (err, _user) => {
        if (err) debug('Error en user.findOne userName: ', req.session.user);
        else if (!_user) debug('ERROR: usuario no encontrado:', req.session.user);
            else {
				_user.numberOfLists++;
				_user.save((err)=> {
					if(err) debug(err.message);
					else console.log(_user);
				});
			}
	});
	module.exports.list.listCreationTime = new Date().toUTCString();
	debug(module.exports.list);
	module.exports.list.save((err) => {
			if(err) debug(err.message);
			else {
				console.log(module.exports.list);
				res.send('SAVE_OK');
			}
	});
}
//Requerido por: /router/router.js