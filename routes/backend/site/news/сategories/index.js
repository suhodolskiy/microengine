exports.get = function(req, res) {
	res.render('./micro/pages/news_categories',{
		pageName : 'сategories',
		pageNameRu : 'Категории новостей',
		level: req.authUser._group[0].lvl
	});			
};