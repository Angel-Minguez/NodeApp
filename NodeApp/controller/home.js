/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home                                                                        */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                    //Importamos el modelo de la lista
const debug = require('debug')('home');
module.exports.home = function (req, res, next) {                           
    listModel.list.find({ userName: req.session.user }, (err, _listResults) => {
        if (err) debug('ERROR en list.find userName: ', req.session.user);       //Control de error en la busqueda
        else if (!_listResults) debug('Listas no encontradas para user:', req.session.user);  //Usuario no encontrado (no deberia ocurrir)
        else {
                module.exports.userListData = _listResults;
				let userListsHtml='';
                _listResults.forEach((_list, _index) => {
                    userListsHtml += _listResults[_index]._doc.listTitle;
                });
                res.render('home.pug', { user: req.session.user, myLists: userListsHtml });
             }
    });
}
module.exports.createCat= function (req, res) {
	//creamos lista ph con la categoria nueva
	console.log(req.body.campo1);
	var treeData = [];
	module.exports.userListData.forEach((_list, _index) => {
		treeData.push({ text: module.exports.userListData[_index]._doc.listCat, nodes: [{text:'Nueva lista'}]);
	});
	res.send(treeData);
	
}
//Requerido por: /router/router.js