exports.get = function(req, res) {
	res.render('./pages/new_pages',{
		pageName : 'newPage',
		pageNameRu : 'Создание новой статической страницы'
	});			
};