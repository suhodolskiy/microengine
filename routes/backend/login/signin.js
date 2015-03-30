var Users = require('../../../components/models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
    Users.signIn(req.body.email, req.body.password, function(err, user){
    	if (err) {
            if (err instanceof HttpMessage) {
                return next(new HttpMessage(err.status, err.message));
            } else {
                return next(err);
            }
        }
    	req.session.auth_user = user._id;
    	res.status(200).end();
    });
};