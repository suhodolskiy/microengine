var Users = require('../../../models/users.js').Users,
	HttpMessage = require('../../../components/error').HttpMessage,
	async = require('async');

exports.get = function(req, res) {
	 async.waterfall([
	 	function(callback){
	 		Users.find({_group: '59501769bf88edb0336c95b5'}, 'name _group').populate('_group', 'name').exec(callback);
	 	},
	 	function(users){  
            if(users){
    			res.render('./micro/pages/calendar',{
					pageName : 'calendar',
					pageNameRu : 'График работы',
					users: users
				});
            } else{
                res.status(500).end;                
            }
        }
	 ]);
};