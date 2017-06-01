var HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

const store = require('../../../models');

exports.post = function(req, res, next) {
    var body = req.body;

    async.waterfall([
        function(callback){
            store.users.getUser(body.id, callback);
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
                },
                email: {
                    text: user.email,
                    name: 'email',
                    type: 'input'
                },
                group: {
                    text: user._group[0]._id,
                    name: 'group',
                    type: 'select'
                }
            }));
        }
    ]); 
};