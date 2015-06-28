var NewsCategories = require('../../../../../models/newsсategories.js').NewsCategories,
    News = require('../../../../../models/news.js').News,
    async = require('async');

exports.get = function(req, res, next) {
    async.series([
        function(callback){
            var newsCategories = NewsCategories.find({}, '_id name.initial', function(err, categories){
                callback(null, categories)
            });
        },
        function(callback){
            News.find({_id: req.params.id}).populate('_category', 'name').exec(function(err, news){
                callback(null, news)
            });
        }
    ],function(err, results){
        res.render('./micro/pages/edit_news',{
            pageName : 'editNews',
            pageNameRu : 'Редактирование новости',
            categories : results[0],
            news : results[1]
        });  
    });
};


