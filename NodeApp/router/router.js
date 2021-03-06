﻿/***************************************************************************************************************/
/*  Modulo: Modulo controlador de /router                                                                      */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
var app = require('../server.js');                  //Importamos la instancia de Express
module.exports = function (req, res, next) {        //Funcion de routeo de requests
    app.get ('/', require('../controller/index.js'));
    app.get ('/login', require('../controller/login.js').userLogin);
    app.post('/login_form', require('../controller/login.js').userLoginForm);
    app.get ('/register', require('../controller/register.js').userRegister);
    app.post('/register_form', require('../controller/register.js').userRegisterForm);
    app.get ('/home', require('../controller/home.js').home);
    app.get ('/home/getTreeData', require('../controller/home.js').getTreeData);
	app.post('/home/manageList', require('../controller/manageList.js').createList);
	app.get ('/home/manageList', require('../controller/manageList.js').deleteList);
    app.post('/home/manageList/addListCat_form', require('../controller/manageList.js').addListCat);
    app.post('/home/manageList/saveList_form', require('../controller/manageList.js').saveList);
    app.post('/home/manageItem/addItem', require('../controller/manageItem.js').addItem);
    app.post('/home/manageItem/deleteItem', require('../controller/manageItem.js').deleteItem);
    app.get ('/logout', require('../controller/logout.js'));
	next();//Invocamos el siguiente elemento de la pila de middleware  
}
//Requerido por: /server.js