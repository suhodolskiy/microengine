var NewsCategories = require('../../../../../models/newsсategories.js').NewsCategories,
    HttpMessage = require('../../../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res, next) {
	var body = req.body;
	
	NewsCategories.remove(req.body, function(err){
		if(err){
            return next(new HttpMessage(403, err.message));
		}
		res.status(200).end();
	});
};