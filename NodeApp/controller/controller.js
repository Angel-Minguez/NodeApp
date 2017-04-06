/**************************************************************/
/*				      Modulo controlador                      */
/**************************************************************/
module.exports.userLogin = function (req, res, next) {
	if (req.session.views) req.session.views++;
	else req.session.views=1;
	res.render('index.pug', {sessionInfo:req.session.views, sid:req.session.id});
	console.log(req.session.views);
    console.log(req.session.id);
}