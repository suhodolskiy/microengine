var express = require('express'),
	router = express.Router(),
	checkAuth = require('../../middleware/checkAuth'),
	checkLogin = require('../../middleware/checkLogin');
	
	// Login
		router.get('/login', checkLogin, require('./login').get);

			router.post('/login', require('./login/signin').post);
			router.get('/signout', checkAuth, require('./login/signout').get);

		router.get('/forgot', checkLogin, require('./forgot').get);

			router.post('/forgot', checkLogin, require('./forgot/forgot').post);

		router.get('/reset/:token', require('./reset').get);

			router.post('/reset/:token', require('./reset/reset').post);

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

		// News
			router.get('/site/news', checkAuth, require('./site/news').get);
			router.get('/site/news/data', checkAuth, require('./site/news/data').get);

				router.post('/site/news/remove', checkAuth, require('./site/news/remove').post);

			router.get('/site/news/new', checkAuth, require('./site/news/new/').get);
				router.post('/site/news/new', checkAuth, require('./site/news/new/data').post);

			router.get('/site/news/edit/:id', checkAuth, require('./site/news/edit/').get);
				router.post('/site/news/edit', checkAuth, require('./site/news/edit/data').post);


			// Сategories 
				router.get('/site/news/categories', checkAuth, require('./site/news/сategories/').get);
				router.get('/site/news/categories/data', checkAuth, require('./site/news/сategories/data').get);
					router.post('/site/news/categories/new', checkAuth, require('./site/news/сategories/new').post);
					router.post('/site/news/categories/edit_data', checkAuth, require('./site/news/сategories/editData').post);
					router.post('/site/news/categories/edit', checkAuth, require('./site/news/сategories/edit').post);
					router.post('/site/news/categories/remove', checkAuth, require('./site/news/сategories/remove').post);


	// Calendar
		router.get('/calendar', checkAuth, require('./calendar').get);
		router.get('/events', checkAuth, require('./calendar/events').get);
		router.post('/events/transfer', checkAuth, require('./calendar/transfer').post);
		router.post('/events/new', checkAuth, require('./calendar/new').post);
		router.post('/events/remove', checkAuth, require('./calendar/remove').post);

	// Store
			router.get('/store', checkAuth, require('./store').get);

				router.get('/store/sale', checkAuth, require('./store/sale').get);
					router.post('/store/sale/data', checkAuth, require('./store/sale/data').post);

				router.post('/store/goods/data', checkAuth, require('./store/goods/data').post);
					router.post('/store/goods/new', checkAuth, require('./store/goods/new').post);
					router.post('/store/goods/remove', checkAuth, require('./store/goods/remove').post);
					
					router.post('/store/goods/edit_data', checkAuth, require('./store/goods/edit_data').post);
					router.post('/store/goods/edit', checkAuth, require('./store/goods/edit').post);

					router.post('/store/goods/supply_data', checkAuth, require('./store/goods/supply_data').post);
					router.post('/store/goods/supply', checkAuth, require('./store/goods/supply').post);

					router.post('/store/goods/sale_data', checkAuth, require('./store/goods/sale_data').post);
					router.post('/store/goods/sale', checkAuth, require('./store/goods/sale').post);

				router.post('/store/turnover/data', checkAuth, require('./store/turnover/data').post);
					router.post('/store/turnover/remove', checkAuth, require('./store/turnover/remove').post);

				router.get('/store/category/data', checkAuth, require('./store/category/data').get);
					router.post('/store/category/transfer', checkAuth, require('./store/category/transfer').post);
					router.post('/store/category/remove', checkAuth, require('./store/category/remove').post);
					router.post('/store/category/create', checkAuth, require('./store/category/new').post);
					router.post('/store/category/rename', checkAuth, require('./store/category/rename').post);


		// Units
			router.get('/store/units', checkAuth, require('./store/units').get);
			router.get('/store/units/data', checkAuth, require('./store/units/data').get);	

				router.post('/store/units/new', checkAuth, require('./store/units/new').post);
				router.post('/store/units/remove', checkAuth, require('./store/units/remove').post);


		// Providers
			router.get('/store/providers', checkAuth, require('./store/providers').get);
			router.get('/store/providers/data', checkAuth, require('./store/providers/data').get);

				router.post('/store/providers/new', checkAuth, require('./store/providers/new').post);
				router.post('/store/providers/remove', checkAuth, require('./store/providers/remove').post);
				router.post('/store/providers/edit_data', checkAuth, require('./store/providers/edit_data').post);
				router.post('/store/providers/edit', checkAuth, require('./store/providers/edit').post);

module.exports = router;