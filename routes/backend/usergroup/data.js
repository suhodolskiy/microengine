var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            UserGroup.find({}).exec(callback);
        },
        function(userGroup){  
            if(userGroup){
    			res.send(JSON.stringify({"data": userGroup}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}