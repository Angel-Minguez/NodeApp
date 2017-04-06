/**************************************************************/
/*				      Modulo controlador                      */
/**************************************************************/
module.exports.userLogin = function (req, res, next) {
    res.render('index.pug', {okUser:"<p>ok</p>"});
}