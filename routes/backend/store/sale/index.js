exports.get = function(req, res) {
	res.render('./micro/pages/store/sale',{
		pageName : 'sale',
		pageNameRu : 'Продажи'
	});
};