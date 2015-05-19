exports.get = function(req, res) {
	res.render('./pages/addnews',{
		pageName : 'addnews',
		pageNameRu : 'Добавление новости'
	});
};