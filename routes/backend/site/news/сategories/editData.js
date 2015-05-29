var NewsCategories = require('../../../../../models/newsсategories.js').NewsCategories,
    async = require('async');

exports.post = function(req, res, next) {
    var body = req.body;

    async.waterfall([
        function(callback){
            NewsCategories.findOne({_id: body.id}, callback);
        },
        function(page, callback){
            res.send(JSON.stringify({
                id: {
                    text: page._id,
                    name: 'id',
                    type: 'input'
                },
                name : {
                    text: page.name.initial,
                    name: 'name',
                    type: 'input'
                },
                url : {
                    text: page.name.trslt,
                    name: 'nameTrslt',
                    type: 'input'
                }
            }));
        }
    ]); 
};