var Unit = require('../../../../models/unit.js').Unit,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            Unit.find({}).exec(callback);
        },
        function(units){  
            if(units){
    			res.send(JSON.stringify({"aaData": units}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}