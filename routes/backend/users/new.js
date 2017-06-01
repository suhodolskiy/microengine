var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage;

const store = require('../../../models');

exports.post = function(req, res, next) {
	store.users.create(req.body, function(err){
		if(err){
            return next(new HttpMessage(403, err.message));
		}
		res.status(200).end();
	});
};