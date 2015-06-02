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
                name : {
                    text: goods.name,
                    name: 'name',
                    type: 'input'
                },
                markup : {
                    text: goods.markup,
                    name: 'markup',
                    type: 'input'
                }
            }));
        }
    ]); 
};