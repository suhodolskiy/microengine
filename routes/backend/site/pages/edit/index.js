var Pages = require('../../../../../models/pages.js').Pages,
    async = require('async');

exports.get = function(req, res) {
	async.waterfall([
        function(callback){
            Pages.find({_id: req.params.id}, '-author').exec(callback);
        },
        function(page){
         	res.render('./micro/pages/edit_page',{
				pageName : 'editPage',
				pageNameRu : 'Редактирование страницы',
				page : page,
                level: req.authUser._group[0].lvl
			});	 
        }
    ]);		
};