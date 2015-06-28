var News = require('../../../models/news.js').News,
	Pages = require('../../../models/pages.js').Pages
	async = require('async');

exports.get = function(req, res) {

	console.log('test');

    async.parallel([
		function(callback){
			Pages.find({}, '-_id name', callback);
		},
		function(callback){
			Pages.find({'name.trslt': req.params.page}, '-_id name description', callback);
		}
	],
	function(err, results){
		res.render('./template/pages/page', {
	        pageName : 'news',
	        Pages: results[0],
	        Page: results[1]
		});   
	});
};