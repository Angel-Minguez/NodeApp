/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home                                                                        */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                    							//Importamos el modelo de la lista
const debug = require('debug')('home');
module.exports.home = function (req, res, next) {
    res.render('home.pug', { user: req.session.user });
}
module.exports.getTreeData = function (req, res) {
    listModel.list.find({ userName: req.session.user }, (err, _listResults) => {
        var treeData = [];
        var treeNode = [];
            if (err) debug('ERROR en list.find userName: ', req.session.user);       				//Control de error en la busqueda
            else if (!_listResults) debug('Listas no encontradas para user:', req.session.user);	//Usuario no encontrado (no deberia ocurrir)
            else {
                while (_listResults.length > 0) {
                    var currentCat = _listResults[0]._doc.listCat;
                    var currentElem = 'undefined';
                    while (currentElem = _listResults.find((elem) => elem._doc.listCat === currentCat)) {
                        treeNode.push({ text: currentElem._doc.listTitle,
										href: '/home/viewList?id=' + currentElem._doc._id,
										tags: ["<a href=\"/home/deleteList?listId="+currentElem._doc._id+"\">Delete List</a>"]});
                        _listResults.splice(_listResults.indexOf(currentElem), 1);
                    }
                    treeNode.push({ text: 'Nueva lista',
									tags: ["<a href=\"/home/createList?cat=" + currentCat + "\">Create List</a>"]});										   
                    treeData.push({ text: currentCat, href: '/home/viewCat?cat=' + currentCat , nodes: treeNode });
                    treeNode = [];
                }
                res.send(treeData);
            }
        });
}
module.exports.viewList = function (req, res, next) {
	let viewHtml;
	listModel.list.findOne({ _id: req.query.id}, (err, _list){
		if(err) debug('ERROR en listModel.find', req.query.id);
		else if(!_list) debug('ERROR lista no encontrada', req.query.id);
		else res.render('viewList.pug', {data: _list.listItems}, (err, html) => {
			viewHtml = html;
			res.send(viewHtml);
		});
	});
	debug(req.query.id);
}
//Requerido por: /router/router.js