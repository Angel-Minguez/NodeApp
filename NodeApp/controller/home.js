/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home                                                                        */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                    							//Importamos el modelo de la lista
const hash = require('password-hash');                                                              //Impostamos el modulo de hasheo
const debug = require('debug')('home');                                                             //Añadimos el modulo de mensajes de depuracion
//Funcion de renderizacion de la estructura de la pagina /home del usuario
module.exports.home = function (req, res, next) {
    res.render('home.pug', { user: req.session.user });
}
//Funcion que recoge las categorias y nombres de las listas y puebla con ellas el treeview
module.exports.getTreeData = function (req, res) {                                              
    listModel.list.find({ userName: req.session.user }, (err, _listResults) => {                    //Buscamos todas las listas del usuario
        var treeData = [],                                                                          //Variable que contendra la estructura de categorias
            treeNode = [];                                                                          //Variable que contendra las listas de cada categoria
            if (err) debug('ERROR en list.find userName: ', req.session.user);       				//Control de error en la busqueda
            else if (!_listResults) debug('Listas no encontradas para user:', req.session.user);	//El usuario no tiene listas creadas
                else {                                                                              //Si existen listas
                    while (_listResults.length > 0) {                                               //Mientras queden listas en el array de resultados
                        var currentCat = _listResults[0]._doc.listCat,                              //Variable que almacena la categoria actual
                            currentElem = 'undefined';                                              //Variable que almacena el elemento actual
                        while (currentElem = _listResults.find((elem) => elem._doc.listCat === currentCat)) {                           //Mientras sigan quedando elementos de la categoria actual
                            treeNode.push({ text: currentElem._doc.listTitle , id: hash.generate(currentElem._doc._id.toString()),       //Alamcenamos el elemento
                                            icon: 'glyphicon glyphicon-list',
                                            tags: ["<a href=\"/home/deleteList?listId=" + currentElem._doc._id + "\">Delete List</a>"]
                            });   //Añadimos el enlace de borrado en una tag
                            _listResults.splice(_listResults.indexOf(currentElem), 1);                                                  //Eliminamos el elemento del array de resultados
                        }
                      
                           // treeNode.push({
                             //   text: 'New List', icon: 'glyphicon glyphicon-list',                             //Añadimos el ultimo elemento de la lista 
                           //     tags: ["<a href=\"/home/createList?cat=" + currentCat + "\">Create List</a>"]
                          //  });                                                                                             //Que es un enlace a crear nueva lista				
                     
                    
                        treeData.push({ text: currentCat, nodes: treeNode });                                           //Añadimos el array de listas al array de categorias 
                        treeNode = [];                                                                                  //Reseteamos el array de listas para procesar la proxima categoria
                    }
                    res.send(treeData);                                                                                 //Enviamos el array de categorias a la vista
                 }
        });
}


module.exports.viewList = function (req, res, next) {
	let viewHtml;
    listModel.list.findOne({userName: req.session.user, listTitle: req.body.name, listCat: req.body.parent.text  }, (err, _list) => {
        if (err) debug('ERROR en listModel.find', req.body.name, ':', req.body.parent.text);
        else if (!_list) debug('ERROR lista no encontrada', req.body.name, ':', req.body.parent);
        else {
            if (hash.verify(_list._id.toString()), req.body.id) {
                res.render('listView.pug', { data: _list.listItems }, (err, html) => {
                    if (err) console.log(err);
                    viewHtml = html;
                    res.send(viewHtml);
                });
            }
            else debug('ERROR en listModel.find, HASH incorrecto', req.body.name, ':', req.body.parent);
        }
	});
	debug(req.body.name, ':', req.body.parent);
}
//Requerido por: /router/router.js