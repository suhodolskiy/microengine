// var Users = require('../../../models/users.js').Users,
//     HttpMessage = require('../../../components/error').HttpMessage,
//     moment = require('moment'),
//     async = require('async');

// exports.get = function(req, res) {
//     async.waterfall([
//         function(callback){
//             Users.find({}).populate('_group', 'name').exec(callback);
//         },
//         function(users){  
//             if(users){
//     			res.send(JSON.stringify({"aaData": users}));
//             } else{
//                 res.status(500).end;                
//             }
//         }
//     ]); 
// }


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
    			res.render('./pages/calendar',{
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