var mongoose = require('mongoose'),
    config = require('config'),
    log = require('../log')(module);

mongoose.connect(config.get('mongoose.uri'), config.get('mongoose.options'));
log.info('Mongoose successfully connected');

module.exports = mongoose;