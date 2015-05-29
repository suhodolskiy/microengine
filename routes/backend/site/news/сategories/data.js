var NewsCategories = require('../../../../../models/newsсategories.js').NewsCategories,
    HttpMessage = require('../../../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            NewsCategories.find({}).populate('_author', 'name').exec(callback);
        },
        function(newsCategories){  
            if(newsCategories){
    			res.send(JSON.stringify({"aaData": newsCategories}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}