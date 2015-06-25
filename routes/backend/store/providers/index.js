exports.get = function(req, res) {
	res.render('./micro/pages/store/providers',{
		pageName : 'providers',
		pageNameRu : 'Список поставщиков'
	});
};