var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var Schema = mongoose.Schema,
    Providers = new Schema({
  		name: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        unp: {
            type: Number
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        bank: {
            name: {
                type: String
            },
            address: {
                type: String
            },
            mfo: {
                type: Number
            },
            expense: {
                type: Number
            }
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

    // Statics
        Providers.statics.new = function(body, callback) {
            var Provider = this;


            console.log('ob1');

            async.waterfall([
                function(callback){
                    console.log('ob2');
                    Provider.findOne({name : body.name}, callback);
                },
                function(provider, callback){
                    console.log('ob3');
                    if(!provider){
                        var provider = new Provider({
                            name: body.name,
                            address: body.address,
                            unp: body.unp,
                            phone: body.phone,
                            email: body.email,
                            bank: {
                                name: body.bank_name,
                                address: body.bank_address,
                                mfo: body.bank_mfo,
                                expense: body.expense
                            }
                        });

                        provider.save(function(err){
                            if(err) return err;

                            callback(null);
                        });
                    } else{
                        callback(new HttpMessage(403, 'Организация с таким <b>название</b> уже существует'));
                    }
                }
            ], callback);
        };

        Providers.statics.remove = function(body, callback) {
            var Provider = this;

            async.each(body, function(id, callback){
                Provider.findOneAndRemove({_id: id}, callback);
            }, function(err){
                if(err){
                    callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
                }
                callback(null);
            });
        };

        Providers.statics.edit = function(body, callback) {
            var Provider = this;

            async.waterfall([
                function(callback){
                    Provider.findOneAndUpdate({_id: body.id}, {
                            name: body.name,
                            address: body.address,
                            unp: body.unp,
                            phone: body.phone,
                            email: body.email,
                            bank: {
                                name: body.bank_name,
                                address: body.bank_address,
                                mfo: body.bank_mfo,
                                expense: body.expense
                            }
                        }, callback);
                },
                function(provider, callback){
                    if(!provider){
                      callback(new HttpMessage(403, 'Поставщик с таким <b>id</b> не найден'));
                    } else{
                      callback(null);
                    }
                }
            ], callback);
        };

    // Exports

        exports.Providers = mongoose.model('Providers', Providers);