exports.get = function(req, res) {
	req.session.destroy(function(err) {
  		res.status(200).end();
	});
};