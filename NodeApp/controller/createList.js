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
                listCreationTime: 'undefined'                                       //Fecha de la creacion de la lista
                });    
    });
    //Poblamos el dropdown
    var cats = [];
    listModel.list.find({ userName: req.session.user }, (err, _listResults) => {
        while (_listResults.length > 0) {                                               //Mientras queden listas en el array de resultados
            var currentCat = _listResults[0]._doc.listCat,                              //Variable que almacena la categoria actual
            currentElem = 'undefined';                                              	//Variable que almacena el elemento actual
                while (currentElem =_listResults.find((elem) => elem._doc.listCat === currentCat)) {//Mientras sigan quedando elementos de la categoria actual
                    _listResults.splice(_listResults.indexOf(currentElem), 1);          //Eliminamos el elemento del array de resultados
                }
                cats.push(currentCat);                                           		//Añadimos el array de listas al array de categorias 
        }
        cats.push('New');
		res.render('createList.pug', { user: req.session.user, cats: cats });		        
    });
}
//Funcion para añadir titulo a la lista
module.exports.addListTitle = function (req, res) {   							    
    if (req.body.campo1)                                                            //Si el item no es una cadena vacia
        listModel.list.find({                                                       //Buscamos otras listas de la misma categoria
            'userName': req.session.user,                                           //Y del mismo usuario
            'listCreationTitle': req.body.campo1
        }, (err, _listResults) => {
            if (err) debug('ERROR en user.findOne listCat: ', module.exports.list.listCat);       //Si se produce un error en la busqueda lo mostramos
            else if (_listResults.length > 0) {                                                   //Si ya existen listas con ese titulo en la categoria
                    debug('Numero de listas encontradas:', _listResults.length);                  //Mostramos el numero de listas encontradas
                    module.exports.list.listTitle = req.body.campo1 + '_' + _listResults.length.toString();                         //Aginamos al titulo es nombre de creacion + un ordinal
                    let count = 1;                                                                                                  //Inicializamos el contador de ocurrencias del nuevo titulo+ordinal creado
                    while (_listResults.findIndex( (_list) => _list._doc.listTitle === module.exports.list.listTitle) >= 0) {       //Buscamos en el array de resultados ocurrencias del ordinal generado
                        module.exports.list.listTitle = req.body.campo1 + '_' + (count++).toString();                               //Si ya esta cogido ese nombre generamos el siguiente y volvemos a chequear
                    }
                 }
                 else {			                                                                                //Si no existen titulos con ese nombre en la categoria
                    debug('Primera lista con nombre: ', req.body.campo1);                                       //Lo notificamos
                    module.exports.list.listTitle = req.body.campo1;	                                        //Añadimos el titulo a nuestro objeto lista
                 }
            let listItemHtml = '<div id="list_item">TITLE: ' + module.exports.list.listTitle + '</div>';        //HTML que añadimos a la pagina
            module.exports.list.listCreationTitle = req.body.campo1;                                           //Añadimos el titulo de creacion son modificar
            debug(module.exports.list.userName);                                                                //Mostramos en debug el usuario
            debug(module.exports.list.listTitle);                                                               //Y el titulo final de la lista
            res.send(listItemHtml);											                                    //Actualizamos la lista
        });
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
	if(module.exports.list.listCat=='undefined') module.exports.list.listCat = req.body.cat;
	debug(module.exports.list);                                                     //Lo mostramos en debug
	module.exports.list.save((err) => {                                             //Lo guardamos en la bd
			if(err) debug('ERROR guardando lista:', err.message);                   //Mostramos error en el guardado de la lista
			else {                                                                  //En caso de ir todo bien
				debug(module.exports.list);                                         //Mostramos la lista en debug
				res.send('SAVE_OK');                                                //Mandamos a la vista la señal de que el guardado ha sido exitoso
			}
	});
}
//Funcion que añade la categoria a la lista
module.exports.addListCat = function (req, res){
	module.exports.list.listCat=req.body.campo1;
	res.end('<div id="list_cat">' + req.body.campo1 + '</div>' );
}
//Requerido por: /router/router.js