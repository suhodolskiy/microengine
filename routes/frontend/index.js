var express = require('express'),
	router = express.Router();

router.get('/', require('./main').get);
router.get('/:category/:news', require('./news').get);
router.get('/:page', require('./pages').get);

module.exports = router;