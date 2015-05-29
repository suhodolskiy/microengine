var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var Schema = mongoose.Schema,
    Unit = new Schema({
  		measure: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    });

// Statics
    // New
        Unit.statics.new = function(body, callback) {
            var Unit = this;

            async.waterfall([
                function(callback){
                   Unit.findOne({name: body.measure}, callback);
                },
                function(unit, callback){
                    if(!unit){
                        var unit = new Unit({measure: body.measure, value: body.value});

                        unit.save(function(err){
                            if(err) return err;
                            console.log(err);
                            callback(null);
                        });
                    } else{
                        callback(new HttpMessage(403, 'Еденица измерения уже существует'));
                    }
                }
            ], callback);
        };
    // Remove
        Unit.statics.remove = function(body, callback) {
            var Unit = this;

            async.each(body, function(id, callback){
                    Unit.findOneAndRemove({_id: id}, callback);
            }, function(err){
                if(err){
                    callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
                }
                callback(null);
            });
        };

// Exports

    exports.Unit = mongoose.model('Unit', Unit);