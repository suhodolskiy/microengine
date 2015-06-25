var News = require('../../../models/news.js').News,
	Pages = require('../../../models/pages.js').Pages,
	moment = require('moment'),
	async = require('async');

exports.get = function(req, res) {
    async.parallel([
		function(callback){
			News.find({'name.trslt': req.params.news}, '-_id _category name image publish description created').populate('_category', 'name').exec(callback);
		},
		function(callback){
			Pages.find({}, '-_id name', callback);
		}
	],
	function(err, results){
		res.render('./template/pages/news', {
	        pageName : 'news',
	        News: results[0],
	        Pages: results[1],
	        moment: moment
		});   
	});
};