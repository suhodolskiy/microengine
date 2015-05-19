var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
	Users.signIn(req.body, function(err, user){
		if(err){
            return next(new HttpMessage(403, err.message));
		}
		req.session.authUser = user._id;
		res.status(200).end();
	});
};