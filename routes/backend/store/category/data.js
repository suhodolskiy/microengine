var GoodsCategories = require('../../../../models/goodscategories.js').GoodsCategories,
    HttpMessage = require('../../../../components/error').HttpMessage,
    async = require('async');

exports.get = function(req, res) {
    async.waterfall([
        function(callback){
            GoodsCategories.find({}).exec(callback);
        },
        function(category){  
            if(category){
    			res.send(category);
            } else{
                res.status(500).end;                
            }
        }
    ]); 
}