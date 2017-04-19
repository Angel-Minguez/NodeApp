/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /home                                                                        */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
'use strict'
const listModel = require('../models/listModel.js');                    //Importamos el modelo de la lista
const debug = require('debug')('home');
module.exports = function (req, res, next) {                           
    listModel.list.find({ userName: req.session.user }, (err, _listResults) => {
        if (err) debug('ERROR en list.find userName: ', req.session.user);       //Control de error en la busqueda
        else if (!_listResults) debug('Listas no encontradas para user:', req.session.user);  //Usuario no encontrado (no deberia ocurrir)
        else {
                let userListsHtml='';
                _listResults.forEach((_list, _index) => {
                    userListsHtml += _listResults[_index]._doc.listTitle;
                });
              
                res.render('home.pug', { user: req.session.user, myLists: userListsHtml });
             }
    });
}
//Requerido por: /router/router.js