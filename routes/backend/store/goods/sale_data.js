var Goods = require('../../../../models/goods.js').Goods,
    async = require('async');

exports.post = function(req, res, next) {
    var body = req.body;

    async.waterfall([
        function(callback){
            Goods.findOne({_id: body.id}, callback);
        },
        function(goods, callback){
            res.send(JSON.stringify({
                id: {
                    text: goods._id,
                    name: 'id',
                    type: 'input'
                },
                price : {
                    text: goods.price,
                    name: 'price',
                    type: 'input'
                }
            }));
        }
    ]); 
};