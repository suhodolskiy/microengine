var NewsCategories = require('../../../../../models/newsсategories.js').NewsCategories,
    async = require('async');

exports.get = function(req, res) {
	async.waterfall([
        function(callback){
            NewsCategories.find({}, '_id name.initial').exec(callback);
        },
        function(newsCategories){
         	res.render('./pages/new_news',{
				pageName : 'newNews',
				pageNameRu : 'Создание новости',
				categories : newsCategories
			});	 
        }
    ]);	
};