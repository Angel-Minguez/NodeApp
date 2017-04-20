/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home                                                                        */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                    //Importamos el modelo de la lista
const debug = require('debug')('home');
module.exports.home = function (req, res, next) {
    res.render('home.pug', { user: req.session.user });
}
module.exports.getTreeData = function (req, res) {
    listModel.list.find({ userName: req.session.user }, null, { sort: { listCat: 1 } }, (err, _listResults) => {
        var treeData = [];
            var treeNode = [];
            if (err) debug('ERROR en list.find userName: ', req.session.user);       //Control de error en la busqueda
            else if (!_listResults) {
                debug('Listas no encontradas para user:', req.session.user);
           
            }//Usuario no encontrado (no deberia ocurrir)
            else {
                console.log(_listResults);
                while (_listResults.length > 0) {
                //_listResults.forEach((_list, _index) => {
                    /*if (_listResults[_index]._doc.listCat === _listResults[_index - 1]._doc.listCat) 
                        treeNode.push({ text: _listResults[_index]._doc.listTitle });
                        treeData.push({ text: _listResults[_index]._doc.listCat, nodes: treeNode });*/
           
                    var currentCat = _listResults[0]._doc.listCat;
                    var currentElem = 'undefined';
                    while (currentElem = _listResults.find((elem) => elem._doc.listCat === currentCat)) {

                        treeNode.push({ text: currentElem._doc.listTitle });
                        _listResults.splice(_listResults.indexOf(currentElem), 1);
                    }
                    treeNode.push({ text: 'Nueva lista', tags: ["<a href=\"/home/createList?cat=" + currentCat + "\">Create List</a>"] });
                    treeData.push({ text: currentCat, nodes: treeNode });
                    treeNode = [];

                    /*if (_listResults[_index]._doc.listCat === _listResults[_index - 1]._doc.listCat) treeNode.push({ text: _listResults[_index]._doc.listTitle });
                    else {
                            treeData.push({ text: _listResults[_index]._doc.listCat, nodes: treeNode });
                            treeNode = [];
                         }*/
                }
                console.log(_listResults);
                if (req.query.catName) treeData.push({
                    text: req.query.catName, nodes: [{ text: 'Nueva lista', tags: ["<a href=\"/home/createList?cat=" + req.query.catName + "\">Create List</a>"] }]
                });
                res.send(treeData);
            }

        });
    
}
/*module.exports.createCat = function (req, res) {
	let treeData = [];
    treeData.push({
        text: req.body.campo1, nodes: [{text: 'Nueva lista', tags: ["<a href=\"/home/createList?cat=" + req.body.campo1 + "\">Create List</a>"]}]
    });
	res.send(treeData);
}*/
//Requerido por: /router/router.js