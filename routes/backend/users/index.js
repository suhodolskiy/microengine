var Users = require('../../../components/models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage,
    moment = require('moment'),
    async = require('async');

exports.get = function(req, res) {

	async.waterfall([
        function(callback){
            Users.find({}).populate('_group', 'name').exec(callback);
        },
        function(users){
            console.log(users);
         	res.render('./pages/users', {
				pageName : 'users',
				pageNameRu : 'Список пользователей',
				users: users,
                moment: moment
			});   
        }
    ]);

		
};