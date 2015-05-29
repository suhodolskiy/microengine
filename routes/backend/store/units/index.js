exports.get = function(req, res) {
	res.render('./pages/store/units',{
		pageName : 'units',
		pageNameRu : 'Еденицы измерения'
	});
};