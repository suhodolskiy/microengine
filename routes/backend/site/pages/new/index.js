exports.get = function(req, res) {
	res.render('./micro/pages/new_pages',{
		pageName : 'newPage',
		pageNameRu : 'Создание новой статической страницы'
	});			
};