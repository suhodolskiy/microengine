var express = require('express'),
	router = express.Router();

router.get('/', function(req, res){
	res.redirect('/micro')
});

module.exports = router;