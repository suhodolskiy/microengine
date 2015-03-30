exports.get = function(req, res) {
	res.render('./pages/dashboard',{
		pageName : 'dashboard',
		pageNameRu : 'Панель управления'
	});
};