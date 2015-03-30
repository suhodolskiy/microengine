var express = require('express'),
	router = express.Router(),
	checkAuth = require('../../components/middleware/checkAuth');

	// Dashboard
		router.get('/', checkAuth, require('./dashboard').get);

	// Login
	    router.get('/login', require('./login').get);
	    	router.post('/login/signin', require('./login/signin').post);
	    	router.post('/login/logout', require('./login/logout').post);

	// Users
		router.get('/users', require('./users').get);

	// User group
		router.get('/usergroup', require('./usergroup').get);

module.exports = router;