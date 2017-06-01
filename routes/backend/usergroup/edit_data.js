var UserGroup = require('../../../models/userGroup.js').UserGroup,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

    const store = require('../../../models');

exports.post = function(req, res, next) {
    var body = req.body;

    async.waterfall([
        function(callback){
            store.groups.getGroup(body.id, callback);
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
                lvl : {
                    text: user.lvl,
                    name: 'lvl',
                    type: 'select'
                }
            }));
        }
    ]); 
};