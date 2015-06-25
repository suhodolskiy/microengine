exports.get = function(req, res) {
	res.render('./micro/pages/dashboard',{
		pageName : 'dashboard',
		pageNameRu : 'Панель управления',
		level: req.authUser._group[0].lvl
	});
};