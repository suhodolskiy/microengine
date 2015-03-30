var express = require('express'),
	http = require('http'),
	path = require('path'),
	config = require('config'),
	log = require('./components/log')(module),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	HttpMessage = require('./components/error/').HttpMessage;

var app = express();

// EJS

	app.engine('ejs', require('ejs-locals'));
	app.set('views', path.join(__dirname + '/engine'));
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
	
	app.use(require('./components/middleware/sendHttpMessage'));
	app.use(require('./components/middleware/userLoad'));

// Routes

	var backend = require('./routes/backend/'),
		frontend = require('./routes/frontend/');

	app.use('/micro', backend);
	app.use(express.static(path.join(__dirname + '/engine/assets')));

	app.use('/', frontend);
	
// Server

	var server = http.createServer(app);

	server.listen(config.get('port'), config.get('server'), function(){
		log.info('Express '+config.get('server')+' listening on port ' + config.get('port'));
	});

// Exports

	module.exports = app;