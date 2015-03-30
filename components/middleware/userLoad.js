var Users = require('../models/users').Users;

module.exports = function(req, res, next){
    req.auth_user = res.locals.auth_user = null;

    if(!req.session.auth_user) return next();

    Users.findById(req.session.auth_user, '_id email name photo group created', function(err, auth_user){
        if(err) return next();
        req.auth_user = res.locals.auth_user = auth_user;
        next();
    });
};