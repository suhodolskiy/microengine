var userGroup = require('../../../components/models/userGroup.js').userGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {

	async.waterfall([
        function(callback){
            userGroup.find({}).exec(callback);
        },
        function(_userGroup){
            console.log(_userGroup);
         	res.render('./pages/usergroup', {
				pageName : 'usergroup',
				pageNameRu : 'Группы пользователей',
				usergroups: _userGroup,
			});   
        }
    ]);

		
};