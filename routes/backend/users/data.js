var HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

const store = require('../../../models');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            store.users.getUsers(callback);
        },
        function(users){  
            if(users){
    			res.send(JSON.stringify({"aaData": users}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}