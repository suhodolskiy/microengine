var winston = require('winston');

function getLogger(module) {
	var path = module.filename.split('/').slice(-2).join('/');

	return new (winston.Logger)({
		transports: [
			new (winston.transports.Console)(),
			new (winston.transports.File)({ label : path ,filename: 'components/log/history.log' })
		]
	});
}


module.exports = getLogger;