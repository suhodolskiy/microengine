var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage,
    str2json = require('string-to-json'),
    async = require('async');

exports.post = function(req, res, next) {
	var body = req.body;
	
	Users.remove(req.body, function(err){
		if(err){
            return next(new HttpMessage(403, err.message));
		}
		res.status(200).end();
	});
};