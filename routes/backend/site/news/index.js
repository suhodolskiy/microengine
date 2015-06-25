exports.get = function(req, res) {
	res.render('./micro/pages/news',{
		pageName : 'news',
		pageNameRu : 'Список новостей',
		level: req.authUser._group[0].lvl
	});
};