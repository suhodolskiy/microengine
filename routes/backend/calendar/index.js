var Users = require('../../../models/users.js').Users,
	HttpMessage = require('../../../components/error').HttpMessage,
	async = require('async');

exports.get = function(req, res) {
	 async.waterfall([
	 	function(callback){
	 		Users.find({_group: '5559e8fc25287fd5545e4885'}, 'name _group').populate('_group', 'name').exec(callback);
	 	},
	 	function(users){  
            if(users){
    			res.render('./micro/pages/calendar',{
					pageName : 'calendar',
					pageNameRu : 'График работы',
					users: users,
					level: req.authUser._group[0].lvl
				});
            } else{
                res.status(500).end;                
            }
        }
	 ]);
};