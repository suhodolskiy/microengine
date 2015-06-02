var Providers = require('../../../../models/providers.js').Providers,
    GoodsTurnover = require('../../../../models/goodsturnover.js').GoodsTurnover
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res) {
    async.waterfall([
        function(callback){
            GoodsTurnover.find({goods: req.body.id}, '_id type doc date _provider comment qty price sum _creator', callback).populate('_provider','name').populate('_creator','name');
        },
        function(turnover){  
            res.send(JSON.stringify({"aaData": turnover}));
        }
    ]); 
}