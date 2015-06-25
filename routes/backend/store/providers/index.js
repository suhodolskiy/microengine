exports.get = function(req, res) {
	res.render('./micro/pages/store/providers',{
		pageName : 'providers',
		pageNameRu : 'Список поставщиков',
		level: req.authUser._group[0].lvl
	});
};