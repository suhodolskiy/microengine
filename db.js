var mongoose = require('./components/mongoose/'),
    log = require('./components/log')(module),
    async = require('async');

var Users = require('./components/models/users.js').Users;

var userGroup = require('./components/models/userGroup.js').userGroup;



// Async 
    async.series([
        open,
        requireModels,
        createUsers
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
        require('./components/models/users.js');

        async.each(Object.keys(mongoose.models), function(modelName, callback){
            mongoose.models[modelName].ensureIndexes(callback);
        }, callback);
    }
    function createUsers(callback){
        users = [
          {
            "email" : "ilya.suhodolskiy@gmail.com", 
            "name" : "Суходольский Илья Валерьевич", 
            "_group" : "5516d1927ec2dd3e37eb8475" , 
            "password" : "test"
          },
          {
            "name": "Thomas Banks",
            "email": "tbanks0@merriam-webster.com",
            "_group": "5516d1927ec2dd3e37eb8475",
            "password": "KExUZhP"
          },
          {
            "name": "John Ward",
            "email": "jward1@liveinternet.ru",
            "_group" : "5516d1927ec2dd3e37eb8475" , 
            "password": "ZPp1KIXmNsFm"
          },
          {
            "name": "Denise King",
            "email": "dking2@canalblog.com",
            "_group": "5516d1927ec2dd3e37eb8475",
            "password": "vqZKNGl2G"
          },
          {
            "name": "Jessica Weaver",
            "email": "jweaver3@linkedin.com",
            "_group" : "5516d1927ec2dd3e37eb8475" , 
            "password": "BM3Bpz986"
          },
          {
            "name": "Pamela Hughes",
            "email": "phughes4@nationalgeographic.com",
            "_group" : "5516d1927ec2dd3e37eb8475" , 
            "password": "SC6c8Eft2r"
          },
          {
            "name": "Craig Snyder",
            "email": "csnyder5@fda.gov",
            "_group": "5516d1927ec2dd3e37eb8475",
            "password": "ETQxUsN5qCS"
          },
          {
            "name": "Robert Morales",
            "email": "rmorales6@trellian.com",
            "_group" : "5516d1927ec2dd3e37eb8475" , 
            "password": "CiKQo9JKrvQp"
          },
          {
            "name": "Elizabeth Kennedy",
            "email": "ekennedy7@redcross.org",
            "_group" : "5516d1927ec2dd3e37eb8475" , 
            "password": "olzgxhcAqt"
          },
          {
            "name": "Scott Bennett",
            "email": "sbennett8@eventbrite.com",
            "_group" : "5516d1927ec2dd3e37eb8475" , 
            "password": "BNwUJ8eAuL"
          },
          {
            "name": "Bruce Owens",
            "email": "bowens9@e-recht24.de",
            "_group": "5516d1927ec2dd3e37eb8475",
            "password": "jh9nNU"
          },
          {
            "name": "Clarence Meyer",
            "email": "cmeyera@weebly.com",
            "_group": "5516d1927ec2dd3e37eb8475",
            "password": "Vpq7P2keqG8D"
          },
          {
            "name": "Diana Hall",
            "email": "dhallb@furl.net",
            "_group": "5516d1927ec2dd3e37eb8475",
            "password": "uaLgXM"
          },
          {
            "name": "Mark Mcdonald",
            "email": "mmcdonaldc@nhs.uk",
            "_group": "5516d1927ec2dd3e37eb8475",
            "password": "RNjH32320Qa"
          }
        ]

        async.each(users, function(userData, callback){
            var user = new mongoose.models.Users(userData);
            user.save(callback);
        }, callback);
    };

    function createUserGroup(callback){
        _userGroup = [
            {
                "name": "Администратор"
            },
            {
                "name": "Главный бухгалтер"
            }
        ];

        async.each(_userGroup, function(_userGroupData, callback){
            var _group = new mongoose.models.userGroup(_userGroupData);
            _group.save(callback);
        }, callback);
    };