exports.get = function(req, res) {
	res.render('./micro/pages/store/units',{
		pageName : 'units',
		pageNameRu : 'Еденицы измерения',
		level: req.authUser._group[0].lvl
	});
};