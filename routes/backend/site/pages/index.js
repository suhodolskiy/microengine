exports.get = function(req, res) {
	res.render('./pages/pages',{
		pageName : 'pages',
		pageNameRu : 'Список статических страниц'
	});			
};