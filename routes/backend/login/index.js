exports.get = function(req, res) {
	if (req.session.auth_user) {
		res.redirect('/micro');
	} else{
		res.render('./pages/login',{
			pageName : 'login',
			pageNameRu : 'Авторизация'
		});
	}
};