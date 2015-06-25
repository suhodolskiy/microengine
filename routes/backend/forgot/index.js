exports.get = function(req, res) {
	res.render('./micro/pages/forgot',{
		pageName : 'Recovery',
		pageNameRu : 'Восстановление пароля'
	});
};