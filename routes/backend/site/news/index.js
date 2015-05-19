exports.get = function(req, res) {
	res.render('./pages/news',{
		pageName : 'news',
		pageNameRu : 'Список новостей'
	});
};