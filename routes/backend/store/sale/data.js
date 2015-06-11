var GoodsTurnover = require('../../../../models/goodsturnover.js').GoodsTurnover,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res) {
    async.waterfall([
        function(callback){
            GoodsTurnover.find({date: req.body, type: 0}, callback).populate('_goods', 'name').populate('_creator','name');
        },
        function(goodsturnover){  
            if(goodsturnover){
    			res.send(JSON.stringify({"aaData": goodsturnover}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}