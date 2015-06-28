exports.get = function(req, res) {
	res.render('./micro/pages/pages',{
		pageName : 'pages',
		pageNameRu : 'Список статических страниц'
	});			
};