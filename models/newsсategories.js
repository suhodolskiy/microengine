var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var Users = require('./users.js').Users;

var Schema = mongoose.Schema,
    NewsCategories = new Schema({
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
        created: {
            type: Date,
            default: Date.now
        },
        _author: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Users',
            required: true
        }],
    });

// Statics
    NewsCategories.statics.new = function(body, author, callback) {
        var NewsCategory = this;

        async.waterfall([
            function(callback){
                NewsCategory.findOne({name : {initial: body.name, trslt: body.nameTrslt}}, callback);
            },
            function(newsCategory, callback){
                if(!newsCategory){
                    var newsCategory = new NewsCategory({name: {initial: body.name, trslt: body.nameTrslt}, description: body.description, _author: author});

                    newsCategory.save(function(err){
                        if(err) return err;

                        callback(null);
                    });
                } else{
                    callback(new HttpMessage(403, 'Категория с таким <b>название</b> или <b>url</b> уже существует'));
                }
            }
        ], callback);
    };

     NewsCategories.statics.edit = function(body, callback) {
        var NewsCategory = this;

        async.waterfall([
            function(callback){
                NewsCategory.findOneAndUpdate({_id: body.id}, {name: {initial: body.name, trslt: body.nameTrslt}}, callback);
            },
            function(newsCategory, callback){
                if(!newsCategory){
                  callback(new HttpMessage(403, 'Категория с таким <b>id</b> не найдена'));
                } else{
                  callback(null);
                }
            }
        ], callback);
    };

    NewsCategories.statics.remove = function(body, callback) {
        var NewsCategory = this;

        async.each(body, function(id, callback){
            NewsCategory.findOneAndRemove({_id: id}, callback);
        }, function(err){
            if(err){
                callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
            }
            callback(null);
        });
    };

// Exports

    exports.NewsCategories = mongoose.model('NewsCategories', NewsCategories);