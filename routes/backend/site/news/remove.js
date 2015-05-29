var News = require('../../../../models/news.js').News,
    HttpMessage = require('../../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
	var body = req.body;
	
	News.remove(req.body, function(err){
		if(err){
            return next(new HttpMessage(403, err.message));
		}
		res.status(200).end();
	});
};