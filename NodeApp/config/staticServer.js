/***************************************************************************************************************/
/*  Modulo: Opciones del servidor de archivos estaticos de Express                                             */
/*  Autor:  Angel Minguez Burillo                                                                              */
/***************************************************************************************************************/
const path = require('path');
var app = require('../server.js');
app.use('/favicon.ico', app.express.static(path.normalize(__dirname + '/..') + '/static/favicon.ico'));
app.use('/node_modules', app.express.static(path.normalize(__dirname + '/..') + '/node_modules'));
app.use('/static', app.express.static(path.normalize(__dirname + '/..') + '/static'));

