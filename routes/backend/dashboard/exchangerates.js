var ExchangeRates = require('../../../models/exchangerates').ExchangeRates,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            ExchangeRates.find({}).exec(callback);
        },
        function(rates){  
            if(rates){
    			res.send(rates);
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}