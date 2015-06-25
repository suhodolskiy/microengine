exports.get = function(req, res) {
	res.render('./micro/pages/login',{
		pageName : 'login',
		pageNameRu : 'Вход в панель управления'
	});
};