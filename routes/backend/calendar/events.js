var Events = require('../../../models/events.js').Events,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            Events.find({}).exec(callback);
        },
        function(events){  
            if(events){
    			res.send(JSON.stringify(events));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}