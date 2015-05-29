var GoodsCategories = require('../../../../models/goodscategories.js').GoodsCategories,
    HttpMessage = require('../../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
    var body = req.body;
    
    GoodsCategories.findOneAndUpdate({_id: body.id}, {parent: body.parent}, function(err, data){
        if(err){
            res.status(403).end();
        }
        res.status(200).end();
    });
}