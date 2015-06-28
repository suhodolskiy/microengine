HttpMessage = require('../components/error/').HttpMessage;

module.exports = function(req, res, next) {
    if (!req.session.authUser) {
        res.redirect('/micro/login');
        return false;
    }
    next();
};