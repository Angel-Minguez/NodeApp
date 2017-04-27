/***************************************************************************************************************/
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
	app.post('/home/viewList', require('../controller/home.js').viewList);
	app.get ('/home/createList', require('../controller/createList.js').createList);
	app.get ('/home/deleteList', require('../controller/deleteList.js').deleteList);
    app.post('/home/createList/addListCat_form', require('../controller/createList.js').addListCat);
	app.post('/home/createList/addListTitle_form', require('../controller/createList.js').addListTitle);
    app.post('/home/createList/addListItem_form', require('../controller/createList.js').addListItem);
	app.post('/home/createList/saveList_form', require('../controller/createList.js').saveList);
    app.get ('/logout', require('../controller/logout.js'));
	next();//Invocamos el siguiente elemento de la pila de middleware  
}
//Requerido por: /server.js