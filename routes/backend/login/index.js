exports.get = function(req, res) {
	res.render('./pages/login',{
		pageName : 'login',
		pageNameRu : 'Вход в панель управления'
	});
};