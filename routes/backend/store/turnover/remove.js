var GoodsTurnover = require('../../../../models/goodsturnover.js').GoodsTurnover,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res, next) {	
    GoodsTurnover.remove(req.body, function(err){
        if(err){
            return next(new HttpMessage(403, err.message));
        }

        res.status(200).end();
    });
};