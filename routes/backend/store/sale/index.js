exports.get = function(req, res) {

	res.render('./pages/store/sale',{
		pageName : 'sale',
		pageNameRu : 'Продажи'
	});
};