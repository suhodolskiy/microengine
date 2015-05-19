var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res, next) {
    var body = req.body;

    async.waterfall([
        function(callback){
            Users.findOne({_id: body.id},'_id email name _group').populate('_group', 'name').exec(callback);
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