var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var Users = require('./users.js').Users;

var Schema = mongoose.Schema,
    Pages = new Schema({
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
            type: String,
            required: true
        }
    });

// Statics
    Pages.statics.new = function(body, author, callback) {
        var Page = this;

        async.waterfall([
            function(callback){
                Page.findOne({name : {initial: body.name, trslt: body.nameTrslt}}, callback);

            },
            function(page, callback){
                if(!page){
                    var page = new Page({name: {initial: body.name, trslt: body.nameTrslt}, description: body.description, _author: author});

                    page.save(function(err){
                        if(err) return err;

                        callback(null);
                    });
                } else{
                    callback(new HttpMessage(403, 'Страница с таким <b>название</b> или <b>url</b> уже существует'));
                }
            }
        ], callback);
    };

    Pages.statics.edit = function(body, callback) {
        var Page = this;

        async.waterfall([
            function(callback){
                Page.findOneAndUpdate({_id: body.id}, {name: {initial: body.name, trslt: body.nameTrslt}, description: body.description}, callback);
            },
            function(page, callback){
                if(!page){
                  callback(new HttpMessage(403, 'Страница с таким <b>id</b> не найдена'));
                } else{
                  callback(null);
                }
            }
        ], callback);
    };

     Pages.statics.remove = function(body, callback) {
        var Page = this;

        async.each(body, function(id, callback){
            Page.findOneAndRemove({_id: id}, callback);
        }, function(err){
            if(err){
                callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
            }
            callback(null);
        });
    };

// Exports

    exports.Pages = mongoose.model('Pages', Pages);