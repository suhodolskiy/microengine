HttpMessage = require('../components/error/').HttpMessage;

module.exports = function(req, res, next) {
	if(req.authUser._group[0].lvl > 2){
    	res.redirect('/micro');
    }
  
    next();
};