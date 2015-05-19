var Events = require('../../../models/events.js').Events,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res) {
    var body = req.body;

    Events.findOneAndUpdate({_id: body.id},{start: body.start}, function(err){
        if(err){
        	res.status(403).end();
        }

        res.status(200).end();
    });
}