var Users = require('../models/users').Users;

module.exports = function(req, res, next){
    req.authUser = res.locals.authUser = null;

    if(!req.session.authUser) return next();

    Users.findById(req.session.authUser, '-hashedPassword -salt -__v').populate('_group', 'name').exec(function(err, authUser){
        if(err) return next();
        req.authUser = res.locals.authUser = authUser;
        next();
    });
};