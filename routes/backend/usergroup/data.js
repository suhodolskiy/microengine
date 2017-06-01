var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

const store = require('../../../models');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            store.groups.getGroups(callback);
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