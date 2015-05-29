exports.get = function(req, res) {
	res.render('./pages/store/providers',{
		pageName : 'providers',
		pageNameRu : 'Список поставщиков'
	});
};