exports.get = function(req, res) {
	res.render('./micro/pages/news_categories',{
		pageName : 'сategories',
		pageNameRu : 'Категории новостей'
	});			
};