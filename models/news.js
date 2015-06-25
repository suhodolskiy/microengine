var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;


var Users = require('./users.js').Users;
var NewsCategories = require('./newsсategories.js').NewsCategories;

var Schema = mongoose.Schema,
    News = new Schema({
  		name: {
  			initial: {
  				type: String,
  				unique: true,
  				required: true
  			},
  			trslt: {
  				type: String,
  				unique: true,
  				required: true
  			}
  		},
  		_category: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'NewsCategories',
            required: true
        }],
        _author: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Users',
            required: true
        }],
        created: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        publish: {
            type: Boolean,
            required: true
        }
    });

// Statics
    News.statics.new = function(body, author, callback) {
        var News = this,
            publish = body.publish || false;

        async.waterfall([
            function(callback){
                News.findOne({name : {initial: body.name, trslt: body.nameTrslt}}, callback);
            },
            function(news, callback){
                if(!news){
                    var news = new News({name: {initial: body.name, trslt: body.nameTrslt}, _category: body.category, description: body.description, _author: author, publish: publish, image: body.image});

                    news.save(function(err){
                        if(err) return err;

                        callback(null);
                    });
                } else{
                    callback(new HttpMessage(403, 'Новость с таким <b>название</b> или <b>url</b> уже существует'));
                }
            }
        ], callback);
    };

    News.statics.edit = function(body, callback) {
        var News = this,
            publish = body.publish || false;

            console.log(body);

        async.waterfall([
            function(callback){
                News.findOneAndUpdate({_id: body.id}, {name: {initial: body.name, trslt: body.nameTrslt}, _category: body.category, description: body.description, publish: publish, image: body.image}, callback);
            },
            function(news, callback){
                if(!news){
                  callback(new HttpMessage(403, 'Новость с таким <b>id</b> не найдена'));
                } else{
                  callback(null);
                }
            }
        ], callback);
    };

    News.statics.remove = function(body, callback) {
        var News = this;

        async.each(body, function(id, callback){
            News.findOneAndRemove({_id: id}, callback);
        }, function(err){
            if(err){
                callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
            }
            callback(null);
        });
    };

// Exports

    exports.News = mongoose.model('News', News);