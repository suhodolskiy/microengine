var NewsCategories = require('../../../../../models/newsсategories.js').NewsCategories,
    HttpMessage = require('../../../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res, next) {
	NewsCategories.new(req.body, req.authUser._id, function(err){
		if(err){
            return next(new HttpMessage(403, err.message));
		}
		res.status(200).end();
	});
};