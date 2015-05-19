exports.get = function(req, res) {
	console.log('x1');
	res.render('./pages/news_categories',{
		pageName : 'сategories',
		pageNameRu : 'Категории новостей'
	});
};