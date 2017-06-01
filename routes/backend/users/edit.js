var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

const store = require('../../../models');

exports.post = function(req, res, next) {
    store.users.edit(req.body, function(err){
        if(err){
            return next(new HttpMessage(403, err.message));
        }
        res.status(200).end();
    });
};