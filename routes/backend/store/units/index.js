exports.get = function(req, res) {
	res.render('./micro/pages/store/units',{
		pageName : 'units',
		pageNameRu : 'Еденицы измерения'
	});
};