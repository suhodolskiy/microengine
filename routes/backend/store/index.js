var Unit = require('../../../models/unit.js').Unit,
	Providers = require('../../../models/providers.js').Providers,
	async = require('async');

exports.get = function(req, res) {
	async.series([
		function(callback){
			Unit.find({}, '_id measure', function(err, unit){
				callback(null, unit);
			});
		},
		function(callback){
		    Providers.find({}, '_id name', function(err, providers){
				callback(null, providers);
			});
		}
	],
	function(err, results){
		res.render('./micro/pages/store/store',{
			pageName : 'store',
			pageNameRu : 'Складской учет',
			units: results[0],
			providers: results[1],
			level: req.authUser._group[0].lvl
		});	  
	});
	
};