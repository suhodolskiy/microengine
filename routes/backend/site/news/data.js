var News = require('../../../../models/news.js').News,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            News.find({}).populate('_category', 'name').populate('_author', 'name').exec(callback);
        },
        function(news){  
            if(news){
    			res.send(JSON.stringify({"aaData": news}));
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}