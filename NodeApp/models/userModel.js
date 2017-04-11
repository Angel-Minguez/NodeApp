'use strict'
var mongoose = require('../server.js').mongo;
//user schema
var userSchema = mongoose.Schema({
    userName: String,
    userPassword: String,
    userEmail: String
});

var user = mongoose.model('user', userSchema);
module.exports.user = user;