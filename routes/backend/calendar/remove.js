var Events = require('../../../models/events.js').Events,
    HttpMessage = require('../../../components/error').HttpMessage,
    async = require('async');

exports.post = function(req, res) {
	Events.remove(req.body, req.authUser._group[0].lvl, function(err){
    	if(err){ 
    		res.status(403).end();
    		return false;
    	}
    	
    	res.status(200).end();
    });
}