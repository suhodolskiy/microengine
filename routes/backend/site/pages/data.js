var Pages = require('../../../../models/pages.js').Pages,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            Pages.find({}).populate('_author', 'name').exec(callback);
        },
        function(pages){  
            if(pages){
    			res.send(JSON.stringify({"aaData": pages}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}