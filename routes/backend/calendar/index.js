var Users = require('../../../models/users.js').Users,
	HttpMessage = require('../../../components/error').HttpMessage,
	async = require('async');

const store = require('../../../models');

exports.get = function(req, res) {
	 async.waterfall([
	 	function(callback){
	 		store.users.getUsers(callback);
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