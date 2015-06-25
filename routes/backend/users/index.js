var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    console.log('test');

	async.waterfall([
        function(callback){
            UserGroup.find({}).exec(callback);
        },
        function(userGroup){
            if(req.authUser._group[0].lvl != 1){
                new HttpMessage(500);
                return false;
            }

         	res.render('./micro/pages/users', {
        		pageName : 'users',
        		pageNameRu : 'Список пользователей',
        		userGroups : userGroup
    		});   
        }
    ]);		
};