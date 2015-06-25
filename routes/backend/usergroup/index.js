exports.get = function(req, res) {
	res.render('./micro/pages/usergroup', {
        pageName : 'usergroup',
        pageNameRu : 'Группы пользователей'
    });   	
};