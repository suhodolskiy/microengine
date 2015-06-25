var async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var mongoose = require('../components/mongoose/'),
    Schema = mongoose.Schema,
    ExchangeRates = new Schema({
        create: {
            type: Date,
            default: Date.now
        },
        date: {
            type: Date,
            unique: true,
            required: true
        },
        USD: {
            type: Number,
            required: true
        },
  		EUR: {
            type: Number,
            required: true
        },
        RUB: {
            type: Number,
            required: true
        }
    });

// Statics

    ExchangeRates.statics.load = function(){
        
    };

    // ExchangeRates.statics.add = function(date, usd, eur, rub){
    //     var Rate = this;

    //     async.waterfall([
    //         function(callback){
    //             Rate.findOne({date: date}, callback);
    //         },
    //         function(rate, callback){
    //             if(rate){
    //                 callback(new HttpMessage('У вас актуальная версия курсов валют на сегодняшний день.'));
    //             } else{
    //                 // Add
    //             }
    //         }
    //     ]);
    // };

    // ExchangeRates.statics.cleaning = function(){
    //     // Cleaning table
    // };


// Exports

    exports.ExchangeRates = mongoose.model('ExchangeRates', ExchangeRates);