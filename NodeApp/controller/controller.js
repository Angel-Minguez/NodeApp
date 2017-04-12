/**************************************************************/
/*				      Modulo controlador                      */
/**************************************************************/
var userModel = require('../models/userModel');             //Modelo de datos del usuario
const passwordHash = require('password-hash');              //Modulo de hasheo para passwords
//Carga de la pagina de login
module.exports.index = function (req, res, next) {
    res.redirect('/home');
}
module.exports.userLogin = function (req, res, next) {
	if (req.session.views) req.session.views++;
    else req.session.views = 1;
	res.render('login.pug', { views: req.session.views, sid: req.session.id });
}
//Logica de logueo
module.exports.userLoginForm = function(req,res,next) {
    let userInfo = { userName: req.body.campo1, password: req.body.campo2 };
    //Validacion de login
    var loginPromise = new Promise((resolve, reject) => {
        userModel.user.findOne({ userName: userInfo.userName }, (err, _user) => {
            if (err) {
                console.log('Error en user.findOne userName: ', userInfo.userName);
                reject(Error('Error en user.findOne'));
            }
            else if (_user) {
                //Validamos contraseña 
                if (passwordHash.verify(userInfo.password, _user.userPassword)) resolve('LoginOK');
                else reject(Error('Password invalida'));
            }
        });
    });
    loginPromise.then((result) => {
        req.session.user=userInfo.userName; //Actualizamos sesion con el nombre de usuario
		res.end(result);
        },
        (err) => {
            req.session.user='guest'; //Actualizamos sesion con tipo invitado
			res.end(err.message);
        });
}
//Registro de usuario
module.exports.userRegister = function (req,res,next) {
	res.render('register.pug', {});
}
module.exports.userRegisterForm = function (req, res, next) {
    let userInfo = { username: req.body.campo1, password: req.body.campo2, email: req.body.campo3, session: req.session.id, userStatus: 'undefined' };
    //Funcion de validacion del usuario asincrona
    function validateUser(userInfo, callback) {    
        userModel.user.findOne({ userName: userInfo.username }, (err, _user) => {
            if (err) console.log('Error en user.findOne userName: ', userInfo.username);
            else if (_user) {
                    console.log('ERROR: usuario duplicado:', _user);
                    userInfo.userStatus = 'Nombre de usuario en uso';
                    res.send(userInfo);
                    res.end();
                 } else { userModel.user.findOne({ userEmail: userInfo.email }, (err, _user) => {
                        if (err) console.log('Error en user.findOne useremail: ', userInfo.email);
                            else if (_user) {
                                console.log('ERROR: email duplicado:', _user);
                                userInfo.userStatus = 'Email de usuario en uso';
                                res.send(userInfo);
                                res.end();
                            } else callback(userInfo);
                        });
                 }
        });
    }
    //Invocamos la validacion del usuario
    validateUser(userInfo, (_user) => {
        userInfo.password = passwordHash.generate(req.body.campo2);  //Generamos hash del password
        var newUser = new userModel.user({
            userName: userInfo.username,
            userPassword: userInfo.password,
            userEmail: userInfo.email
        });
        newUser.save((err) => {
            if (err) {
                console.log('Error almacenando usuario');
                userInfo.userStatus = 'Error almacenando informacion de usuario';
                res.send(userInfo);
                res.end();
            }
            else {
                console.log('Usuario creado con exito');
                userInfo.userStatus = 'Usuario creado con exito';
                res.send(userInfo);
                res.end();
            }
        });
        
    });
}
// Pagina Home del usuario
module.exports.userHome = function(req, res, next){
	res.render('home.pug');
}