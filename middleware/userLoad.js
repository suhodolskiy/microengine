var Users = require('../models/users');

module.exports = function(req, res, next){
    req.authUser = res.locals.authUser = null;

    if(!req.session.authUser) return next();

    Users.getUser(req.session.authUser, function(err, user){
        if(err) return next(err);
        
        console.log(user);

        req.authUser = res.locals.authUser = user;
        next();
    })
};