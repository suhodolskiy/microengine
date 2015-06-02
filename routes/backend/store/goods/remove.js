var Goods = require('../../../../models/goods.js').Goods,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res, next) {
    Goods.remove(req.body, function(err){
        if(err){
            return next(new HttpMessage(403, err.message));
        }
        res.status(200).end();
    });
};