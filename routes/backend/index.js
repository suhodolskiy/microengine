var express = require('express'),
	router = express.Router(),
	checkAuth = require('../../middleware/checkAuth'),
	checkLogin = require('../../middleware/checkLogin');


	// Login
		router.get('/login', checkLogin, require('./login').get);

			router.post('/login', require('./login/signin').post);

	// Dashboard
		router.get('/', checkAuth, require('./dashboard').get);

	// Help
		router.get('/help', checkAuth, require('./help').get);

	// Users
		router.get('/users', checkAuth, require('./users').get);
		router.get('/users/data', checkAuth, require('./users/data').get);

			router.post('/users/new', checkAuth, require('./users/new').post);		
			router.post('/users/remove', checkAuth, require('./users/remove').post);	
			router.post('/users/edit_data', checkAuth, require('./users/editData').post);
			router.post('/users/edit', checkAuth, require('./users/edit').post);

	// User group
		router.get('/users/group', checkAuth, require('./usergroup').get);
		router.get('/users/group/data', checkAuth, require('./usergroup/data').get);

			router.post('/users/group/new', checkAuth, require('./usergroup/new').post);
			router.post('/users/group/remove', checkAuth, require('./usergroup/remove').post);
			router.post('/users/group/edit_data', checkAuth, require('./usergroup/edit_data').post);
			router.post('/users/group/edit', checkAuth, require('./usergroup/edit').post);

	// Site
		// Pages
			router.get('/site/pages', checkAuth, require('./site/pages/').get);
			router.get('/site/pages/data', checkAuth, require('./site/pages/data').get);

				router.post('/site/pages/remove', checkAuth, require('./site/pages/remove').post);
				
			router.get('/site/pages/new', checkAuth, require('./site/pages/new/').get);
				router.post('/site/pages/new', checkAuth, require('./site/pages/new/data').post);

			router.get('/site/pages/edit/:id', checkAuth, require('./site/pages/edit/').get);
				router.post('/site/pages/edit', checkAuth, require('./site/pages/edit/data').post);


	// Calendar
		router.get('/calendar', checkAuth, require('./calendar').get);
		router.get('/events', checkAuth, require('./calendar/events').get);
		router.post('/events/transfer', checkAuth, require('./calendar/transfer').post);
		router.post('/events/new', checkAuth, require('./calendar/new').post);
		router.post('/events/remove', checkAuth, require('./calendar/remove').post);
		

	// Site
		// News
			router.get('/site/news', checkAuth, require('./site/news').get);

				router.get('/site/news/add', checkAuth, require('./site/news/add').get);

			// Сategories 
				router.get('/site/news/сategories', checkAuth, require('./site/news/сategories').get);


module.exports = router;