var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
	Users.reset(req.body.password, req.params.token, function(err, user){
		if(err){ return next(new HttpMessage(403, err.message)) }
		res.status(200).end();
	});
};