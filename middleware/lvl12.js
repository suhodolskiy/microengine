HttpMessage = require('../components/error/').HttpMessage;

module.exports = function(req, res, next) {

	console.log('Level #1');
	console.log(req.authUser._group[0].lvl);
	console.log('########');

    if(req.authUser._group[0].lvl != 2){
    	res.redirect('/micro');
    }

    console.log('test');

    next();
};