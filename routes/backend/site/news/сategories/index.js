exports.get = function(req, res) {
	res.render('./pages/news_categories',{
		pageName : 'сategories',
		pageNameRu : 'Категории новостей'
	});			
};