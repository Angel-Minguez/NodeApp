var app = require('../server.js');
var controller = require('../controller/controller.js');
module.exports = function (req, res, next) {
    app.get('/', (req, res) => {
        res.send('hola')

    });
}