/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home/manageList                                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                                //Importamos el modelo de la lista
const userModel = require('../models/userModel.js');                                //Modelo de datos del usuario
const itemModel = require('../models/itemModel.js');
const hash = require('password-hash'); 
const debug = require('debug')('manageList');							            //Modulo de mensajes de debug
//Funcion de carga de la pantalla de creacion de lista
module.exports.createList = function (req, res, next) {
	if(req.body.action=='create') {
		userModel.user.findOne({'userName': req.session.user }, (err, _user) => {       //Buscamos el id del usuario
			if (err) debug('ERROR en user.findOne userName: ', req.session.user);       //Si se produce un error en la busqueda lo mostramos
			else if (!_user) debug('ERROR: usuario no encontrado:', req.session.user);  //Si no se encuentra al usuario (no deberia ocurrir)
				else module.exports.list = new listModel.list({			                //Creamos un objeto temporal list donde ir almacenando
					userName: req.session.user,                                         //Nombre de usuario
					user_id: _user._id,                                                 //ID del usuario
					listCat: 'undefined',                                               //Categoria de la lista
					listTitle: 'undefined',                                             //Titulo de la lista
					listCreationTitle: 'undefined',                                     //Titulo original de creacion
                    listItems: [],                                                      //Elementos de la lista
					listCreationTime: 'undefined',                                       //Fecha de la creacion de la lista
					});    
		});
	}
	//Poblamos los elementos de la lista solo para el caso onnodeselected
	if(req.body.id){
		var elem=[];
		listModel.list.findOne({userName: req.session.user, 
								listTitle: req.body.name, 
								listCat: req.body.parent.text }, (err, _list) => {
			if (err) debug('ERROR en listModel.find', req.body.name, ':', req.body.parent.text);
			else if (!_list) debug('ERROR lista no encontrada', req.body.name, ':', req.body.parent);
			else {
				if (hash.verify(_list._id.toString()), req.body.id) {
					module.exports.list = _list;
                    let items =[];
					itemModel.item.find({listId: _list._id}, (err, _itemResult) => {
						_itemResult.forEach((_item) => {items.push({text: _item.itemText,
																	priority: _item.itemPriority,
																	expire: _item.itemExpireTime,
                                                                    done: _item.itemDone,
																	order: _item.itemOrder,
                                                                    id: _item.hashedId});
						});
						res.render('manageList.pug', {	action: "edit",
														listId: req.body.id,
														user: req.session.user, 
														cats: [],
														catCount: 0,
														cat: _list.listCat,
														title: _list.listTitle,
														elem: items}, (err, html) => {
							if (err) debug(err.msg);
							res.send(html);
						});
					});                                                               
				}
				else debug('ERROR en listModel.find, HASH incorrecto', req.body.name, ':', req.body.parent);
			}
		});
	}
	//Poblamos el dropdown
    if(!req.body.id) {
		var cats = [];                                                                                  //Array que almacenara las categorias                                                               
		listModel.list.find({ userName: req.session.user }, (err, _listResults) => {                    //Buscamos todas las listas del usuario
			while (_listResults.length > 0) {                                                           //Mientras queden listas en el array de resultados
				var currentCat = _listResults[0]._doc.listCat,                                          //Variable que almacena la categoria actual
				currentElem = 'undefined';                                              	            //Variable que almacena el elemento actual
					while (currentElem =_listResults.find((elem)=>elem._doc.listCat === currentCat)) {  //Mientras sigan quedando elementos de la categoria actual
						_listResults.splice(_listResults.indexOf(currentElem), 1);                      //Eliminamos el elemento del array de resultados
					}
                    cats.push(currentCat);                                         		                //Añadimos el array de listas al array de categorias 
			}
            res.render('manageList.pug', {  action: "create",
                                            user: req.session.user,
                                            cats: cats,
                                            catCount: cats.length,
											cat: 'Choose category',
											title: 'Choose a title',
											elem:[]}, (err, html) => {
				if (err) debug(err.msg);
				res.send(html);
			});                                                               
		});
	}	
}
//Funcion que guarda la lista completada en la bd
module.exports.saveList = function (req, res) {
	userModel.user.findOne({ 'userName': req.session.user }, (err, _user) => {      //Buscamos el documento del usuario
        if (err) debug('Error en user.findOne userName: ', req.session.user);       //Control de error en la busqueda
        else if (!_user) debug('ERROR: usuario no encontrado:', req.session.user);  //Usuario no encontrado (no deberia ocurrir)
            else {
				//_user.numberOfLists++;                                            //Se añade uno al numero de listas que tiene el usuario
				_user.save((err)=> {                                                //Se guarda el numero modificado
					if(err) debug('ERROR guardando cambios:', err.message);         //Se muestra error en caso de haberlo                             
					else debug(_user);                                              //Se muestra al usuario modificado
				});
			}
	});
    listModel.list.find({                                                           //Buscamos otras listas de la misma categoria
        'userName': req.session.user,                                               //Y del mismo usuario
        'listCreationTitle': req.body.campo1
    }, (err, _listResults) => {
        if (err) debug('ERROR en user.findOne listCat: ', module.exports.list.listCat);         //Si se produce un error en la busqueda lo mostramos
        else if (_listResults.length > 0) {                                                     //Si ya existen listas con ese titulo en la categoria
            debug('Numero de listas encontradas:', _listResults.length);                        //Mostramos el numero de listas encontradas
            module.exports.list.listTitle = req.body.campo1 + '(' + _listResults.length.toString() + ')';               //Aginamos al titulo es nombre de creacion + un ordinal
            let count = 1;                                                                                              //Inicializamos el contador de ocurrencias del nuevo titulo+ordinal creado
            while (_listResults.findIndex((_list) => _list._doc.listTitle === module.exports.list.listTitle) >= 0) {    //Buscamos en el array de resultados ocurrencias del ordinal generado
                module.exports.list.listTitle = req.body.campo1 + '(' + (count++).toString() + ')';                     //Si ya esta cogido ese nombre generamos el siguiente y volvemos a chequear
            }
        }
        else {			                                                                                //Si no existen titulos con ese nombre en la categoria
            debug('Primera lista con nombre: ', req.body.campo1);                                       //Lo notificamos
            module.exports.list.listTitle = req.body.campo1;	                                        //Añadimos el titulo a nuestro objeto lista
        }
        module.exports.list.listCreationTitle = req.body.campo1;                                        //Añadimos el titulo de creacion son modificar
        debug(module.exports.list.userName);                                                            //Mostramos en debug el usuario
        debug(module.exports.list.listTitle);                                                           //Y el titulo final de la lista
        module.exports.list.listCreationTime = new Date().toUTCString();                                //Terminamos de poblar el objeto lista
        if (module.exports.list.listCat == 'undefined') module.exports.list.listCat = req.body.cat;
        debug(module.exports.list);                                                                     //Lo mostramos en debug
        module.exports.list.save((err) => {                                                             //Lo guardamos en la bd
            if (err) debug('ERROR guardando lista:', err.message);                                      //Mostramos error en el guardado de la lista
            else {                                                                                      //En caso de ir todo bien
                debug(module.exports.list);                                                             //Mostramos la lista en debug
                res.send('SAVE_OK');                                                                    //Mandamos a la vista la señal de que el guardado ha sido exitoso
            }
        });
    });   
}
//Funcion que añade la categoria a la lista
module.exports.addListCat = function (req, res) {
	module.exports.list.listCat=req.body.campo1;
	res.end('<div id="list_cat">' + req.body.campo1 + '</div>' );
}
//Funcion de borrado de una lista
module.exports.deleteList = function (req, res, next) {
    listModel.list.remove({ listTitle: req.query.name, listCat: req.query.cat }, (err) => {
        if (err) debug('ERROR en el borrado de la lista:', req.query.name);
        else res.end();
    });
}
//Requerido por: /router/router.js