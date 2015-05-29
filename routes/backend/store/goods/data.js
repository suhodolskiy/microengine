var Goods = require('../../../../models/goods.js').Goods,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res, next) {
	async.waterfall([
        function(callback){
            Goods.find({category: req.body.id}, callback);
        },
        function(goods){  
            res.send(JSON.stringify({"aaData": goods}));
        }
    ]); 
};