var express = require('express'),
	http = require('http'),
	path = require('path'),
	config = require('config'),
	log = require('./components/log')(module),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon');

var app = express();

// EJS

	app.engine('ejs', require('ejs-locals'));
	app.set('views', path.join(__dirname + '/views'));
	app.set('view engine', 'ejs');

// App use

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());

// Mongo

	var mongoose = require('./components/mongoose'),
		session = require('express-session');
		MongoStore = require('connect-mongo')(session);

	app.use(session({
        secret: config.get('session.secret'),
        key: config.get('session.key'),
        cookie: config.get('session.cookie'),
        store: new MongoStore({
        	mongooseConnection: mongoose.connection
        })
    }));
	
	app.use(require('./middleware/sendHttpMessage'));
	app.use(require('./middleware/userLoad'));

// Routes

	
	app.use('/micro', require('./routes/backend/'));
	app.use('/', require('./routes/frontend/'));
	
	app.use(express.static(path.join(__dirname + '/public')));
	

// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});

	if (app.get('env') === 'development') {
	    app.use(function(err, req, res, next) {
	        log.error(err.status || 500+" | "+err.message);
	    });
	}
	
// Server

	var server = http.createServer(app);

	server.listen(config.get('port'), config.get('server'), function(){
		log.info('Express '+config.get('server')+' listening on port ' + config.get('port'));
	});

// Exports

	module.exports = app;