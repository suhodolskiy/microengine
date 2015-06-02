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
		res.render('./pages/store/store',{
			pageName : 'store',
			pageNameRu : 'Складской учет',
			units: results[0],
			providers: results[1]
		});	  
	});
	
};




		
	// async.waterfall([
 //        function(callback){
 //            Unit.find({}, '_id measure').exec(callback);
 //        },
 //        function(unit ,callback){
 //        	if(unit){
 //        		Unit.find({}, '_id measure').exec(callback);
 //        	}
 //        },
 //        function(unit){
 //         	
 //        }
 //    ]);		