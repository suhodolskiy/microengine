var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
	async.waterfall([
        function(callback){
            UserGroup.find({}).exec(callback);
        },
        function(userGroup){
         	res.render('./micro/pages/users', {
        		pageName : 'users',
        		pageNameRu : 'Список пользователей',
        		userGroups : userGroup,
                level: req.authUser._group[0].lvl
    		});   
        }
    ]);		
};