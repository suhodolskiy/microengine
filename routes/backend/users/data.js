var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            Users.find({}).populate('_group', 'name').exec(callback);
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