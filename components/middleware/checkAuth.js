HttpMessage = require('../error/').HttpMessage;

module.exports = function(req, res, next) {
    if (!req.session.auth_user) {
        res.redirect('/micro/login');
        // return next(new HttpMessage(401, "Вы не авторизованы"));
    }
    next();
};