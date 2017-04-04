'use strict';
var express = require('express');

var app = express();
module.exports = app;
var router = require('./router/router.js');
app.use(router);
app.listen(process.env.PORT);


