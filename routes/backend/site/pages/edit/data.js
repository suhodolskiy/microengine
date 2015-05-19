var Pages = require('../../../../../models/pages.js').Pages,
    HttpMessage = require('../../../../../components/error').HttpMessage;

exports.post = function(req, res, next) {
    Pages.edit(req.body, function(err){
        if(err){
            return next(new HttpMessage(403, err.message));
        }
        res.status(200).end();
    });
};