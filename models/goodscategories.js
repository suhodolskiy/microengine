var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var Schema = mongoose.Schema,
    GoodsCategories = new Schema({
  		parent: {
            type: String,
            required: true,
            default: '#'
        },
        text: {
        	type: String,
            required: true
        }
    });

// Statics
    GoodsCategories.statics.new = function(body, callback) {
        var GoodsCategories = this;

        var category = new GoodsCategories({parent: body.parent, text: body.text});

        category.save(function(err){
            if(err) return err;
            callback(null);
        });
    };

    GoodsCategories.statics.rename = function(body, callback) {
        var GoodsCategories = this;

        GoodsCategories.findOneAndUpdate({_id: body.id, text: body.old},{text: body.text}, function(err){
            if(err) return err;

            callback(null);
        });
    };

    GoodsCategories.statics.remove = function(body, callback) {
        var GoodsCategories = this;

        GoodsCategories.findOneAndRemove({_id: body.id}, function(err){
            if(err) return callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));

            callback(null);
        });   
    };


// Exports

    exports.GoodsCategories = mongoose.model('GoodsCategories', GoodsCategories);