exports.get = function(req, res) {
	res.render('./pages/help',{
		pageName : 'help',
		pageNameRu : 'Справка'
	});
};