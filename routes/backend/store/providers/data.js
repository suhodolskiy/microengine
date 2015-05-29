var Providers = require('../../../../models/providers.js').Providers,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            Providers.find({}).exec(callback);
        },
        function(providers){  
            if(providers){
    			res.send(JSON.stringify({"aaData": providers}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}