var Users = require('../../../models/users.js').Users,
    HttpMessage = require('../../../components/error').HttpMessage;

exports.get = function(req, res) {
	Users.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		if (!user) {
			res.redirect('/micro/login');
		} else{
			res.render('./micro/pages/reset',{
				pageName : 'Reset',
				pageNameRu : 'Сброс пароля'
			});
		}
	});
};
