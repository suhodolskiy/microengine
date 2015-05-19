exports.get = function(req, res) {
	res.render('./pages/usergroup', {
        pageName : 'usergroup',
        pageNameRu : 'Группы пользователей'
    });   	
};