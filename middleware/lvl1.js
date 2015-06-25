HttpMessage = require('../components/error/').HttpMessage;

module.exports = function(req, res, next) {
    if (!req.session.authUser) {
        res.redirect('/micro/login');
    }

    if (req.authUser._group[0].lvl != 1){
    	res.redirect('/micro');
    }

    next();
};