var Events = require('../../../models/events.js').Events,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res) {
    Events.new(req.body, function(err){
    	if(err){
 			res.status(403).end();
    	} else{
    		res.status(200).end();
    	}
    });
}