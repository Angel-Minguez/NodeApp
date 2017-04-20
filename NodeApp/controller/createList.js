/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/createList                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                                //Importamos el modelo de la lista
const userModel = require('../models/userModel.js');                                //Modelo de datos del usuario
const debug = require('debug')('createList');							            //Modulo de mensajes de debug
//Funcion de carga de la pantalla de creacion de lista
module.exports.createList = function (req, res, next) {
	userModel.user.findOne({ 'userName': req.session.user }, (err, _user) => {      //Buscamos el id del usuario
        if (err) debug('ERROR en user.findOne userName: ', req.session.user);       //Si se produce un error en la busqueda lo mostramos
        else if (!_user) debug('ERROR: usuario no encontrado:', req.session.user);  //Si no se encuentra al usuario (no deberia ocurrir)
            else module.exports.list = new listModel.list({			                //Creamos un objeto temporal list donde ir almacenando
				userName: req.session.user,                                         //Nombre de usuario
                user_id: _user._id,                                                 //ID del usuario
                listCat: req.query.cat,
                listTitle: 'undefined',                                             //Titulo de la lista
                listItems: [],                                                      //Elementos de la lista
                listCreationTime: 'undefined'                                       //Fecha de la creacion de la lista
                });    
    });
    res.render('createList.pug', { user: req.session.user });		                //Presentamos la pagina de creacion
}
//Funcion para añadir titulo a la lista
module.exports.addListTitle = function (req, res) {   							    //Si el item no es una cadena vacia
    if (req.body.campo1) module.exports.list.listTitle=req.body.campo1	            //La añadimos a nuestro objeto lista
    let listItemHtml = '<div id="list_item"> TITLE' + req.body.campo1 + '</div>';   //HTML que añadimos a la pagina
    debug(module.exports.list.userName);
    debug(module.exports.list.listItems);
    res.send(listItemHtml);											                //Actualizamos la lista
}
//Funcion para añadir nuevos elementos a la lista
module.exports.addListItem = function (req, res) {   							    //Si el item no es una cadena vacia
    if (req.body.campo1)  module.exports.list.listItems.push(req.body.campo1);	    //La añadimos a nuestro objeto lista
    let listItemHtml = '<div id="list_item">' + req.body.campo1 + '</div>';         //HTML que añadimos a la pagina
    debug(module.exports.list.userName);                                            
    debug(module.exports.list.listItems);
    res.send(listItemHtml);											                //Actualizamos la lista
}
//Funcion que guarda la lista completada en la bd
module.exports.saveList = function (req, res) {
	userModel.user.findOne({ 'userName': req.session.user }, (err, _user) => {      //Buscamos el documento del usuario
        if (err) debug('Error en user.findOne userName: ', req.session.user);       //Control de error en la busqueda
        else if (!_user) debug('ERROR: usuario no encontrado:', req.session.user);  //Usuario no encontrado (no deberia ocurrir)
            else {
				_user.numberOfLists++;                                              //Se añade uno al numero de listas que tiene el usuario
				_user.save((err)=> {                                                //Se guarda el numero modificado
					if(err) debug('ERROR guardando cambios:', err.message);         //Se muestra error en caso de haberlo                             
					else debug(_user);                                              //Se muestra al usuario modificado
				});
			}
	});
	module.exports.list.listCreationTime = new Date().toUTCString();                //Terminamos de poblar el objeto lista
	debug(module.exports.list);                                                     //Lo mostramos en debug
	module.exports.list.save((err) => {                                             //Lo guardamos en la bd
			if(err) debug('ERROR guardando lista:', err.message);                   //Mostramos error en el guardado de la lista
			else {                                                                  //En caso de ir todo bien
				debug(module.exports.list);                                         //Mostramos la lista en debug
				res.send('SAVE_OK');                                                //Mandamos a la vista la señal de que el guardado ha sido exitoso
			}
	});
}
//Requerido por: /router/router.js