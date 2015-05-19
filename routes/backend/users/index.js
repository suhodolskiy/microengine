var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
	async.waterfall([
        function(callback){
            UserGroup.find({}).exec(callback);
        },
        function(userGroup){
         	res.render('./pages/users', {
        		pageName : 'users',
        		pageNameRu : 'Список пользователей',
        		userGroups : userGroup
    		});   
        }
    ]);		
};