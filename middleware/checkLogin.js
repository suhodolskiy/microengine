module.exports = function(req, res, next) {
    if (req.session.authUser) {
        res.redirect('/micro');
    }
    next();
};