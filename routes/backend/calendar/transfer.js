var Events = require('../../../models/events.js').Events,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res) {
    var body = req.body;
    
    if(req.authUser._group[0].lvl == 1){
	    Events.findOneAndUpdate({_id: body.id},{start: body.start}, function(err){
	        if(err){
	        	res.status(403).end();
	        	return false;
	        }

	        res.status(200).end();
	    });
    } else {
    	res.status(403).end();
    }
}