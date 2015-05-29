var GoodsCategories = require('../../../../models/goodscategories.js').GoodsCategories,
    HttpMessage = require('../../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
    GoodsCategories.new(req.body, function(err){
        if(err){
            return next(new HttpMessage(403, err.message));
        }
        res.status(200).end();
    });
}