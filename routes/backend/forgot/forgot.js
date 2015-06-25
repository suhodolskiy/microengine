var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
	Users.forgot(req.body.email, req.headers.host, function(err){
		if(err){ return next(new HttpMessage(403, err.message)) }
		res.status(200).end();
	});
};