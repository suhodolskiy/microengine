var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res, next) {
    var body = req.body;

    async.waterfall([
        function(callback){
            UserGroup.findOne({_id: body.id},'_id name', callback);
        },
        function(user, callback){
            res.send(JSON.stringify({
                id: {
                    text: user._id,
                    name: 'id',
                    type: 'input'
                },
                name : {
                    text: user.name,
                    name: 'name',
                    type: 'input'
                }
            }));
        }
    ]); 
};