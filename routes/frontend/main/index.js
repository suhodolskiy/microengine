var News = require('../../../models/news.js').News,
	Pages = require('../../../models/pages.js').Pages,
	async = require('async');


exports.get = function(req, res) {
 	async.parallel([
		function(callback){
			News.find({}, '-_id _category name image publish', callback).populate('_category', 'name');
		},
		function(callback){
			Pages.find({}, '-_id name', callback);
		}
	],
	function(err, results){
		res.render('./template/pages/main', {
	        pageName : 'users',
	        pageNameRu : 'Строительный магазин',
	        News: results[0],
	        Pages: results[1]
		});   
	});
};