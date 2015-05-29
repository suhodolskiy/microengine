exports.get = function(req, res) {
	res.render('./pages/store/store',{
		pageName : 'store',
		pageNameRu : 'Складской учет'
	});			
};