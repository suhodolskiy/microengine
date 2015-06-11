var mongoose = require('./components/mongoose'),
    log = require('./components/log')(module),
    async = require('async');

var GoodsTurnover = require('./models/goodsturnover.js').GoodsTurnover;



// Async 
    async.series([
        open,
        requireModels
    ], function(err, results){
        console.log(arguments);
        
        mongoose.disconnect();
        process.exit(err ? 255 : 0);
    });

    function open(callback){
        mongoose.connection.on('open', callback);
        log.info('Mongoose connection state: ' + mongoose.connection.readyState);
    }
    function dropDatabase(callback){
        var db = mongoose.connection.db;
        db.dropDatabase(callback);
    }
    function dropCollection(callback){
        var db = mongoose.connection.db;
        db.dropCollection('users', callback);
    }
    function requireModels(callback){
        require('./models/goodsturnover.js');

        async.each(Object.keys(mongoose.models), function(modelName, callback){
            mongoose.models[modelName].ensureIndexes(callback);
        }, callback);
    }