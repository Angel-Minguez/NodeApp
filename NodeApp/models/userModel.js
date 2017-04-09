'use strict'
var mongoose = require('../server.js').mongo;
//user schema
var userSchema = mongoose.Schema({
    userName: String,
    userPassword: String,
    userID: String,
    userEmail: String
})

var user_model = mongoose.model('userModel', userSchema);