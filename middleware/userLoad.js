const store = require('../models');

module.exports = function(req, res, next){
    req.authUser = res.locals.authUser = null;

    if(!req.session.authUser) return next();

    store.users.getUser(req.session.authUser, function(err, user){
        if(err) return next(err);
        
        req.authUser = res.locals.authUser = user;
        next();
    })
};