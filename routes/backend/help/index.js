exports.get = function(req, res) {
	res.render('./micro/pages/help',{
		pageName : 'help',
		pageNameRu : 'Справка'
	});
};