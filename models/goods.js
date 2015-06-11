var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var Schema = mongoose.Schema,
    Goods = new Schema({
        category: {
            type: String,
            required: true
        },
  		name: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true,
            default: 0
        },
        unit: {
            type: String,
            required: true
        },
        purchaseprice: {
            type: Number,
            required: true,
            default: 0
        },
        markup: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        sum: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        }
    });

// Virtual

    Goods.virtual('_markup').set(function(_markup) {
        this.markup = this.markupСonversion(_markup);
    });

// Methods

    Goods.methods.markupСonversion = function(markup) {
        return Number(markup.replace('%',''));
    };

// Statics
    Goods.statics.qty = function(n){
        return n.oldQty+n.newQty;
    }
    Goods.statics.sum = function(n){
        return (Math.round((n.oldQty+n.newQty)*n.purchasePrice)).toFixed(0);
    };
    Goods.statics.sale = function(body, creator, callback){
        Goods = this;



        async.waterfall([
            function(callback){
                Goods.find({_id: body.id}, callback);
            },
            function(goods, callback){
                if(goods){
                    if(body.qty > goods[0].qty || body.qty < 0){
                        callback(new HttpMessage(403, 'Недостаточное количество товара на складе (На складе:'+goods[0].qty+')'));    
                    } else {
                        var qty = Number(goods[0].qty)-Number(body.qty),
                            sum = (Math.round(qty*Number(body.price))).toFixed(0);

                        Goods.findOneAndUpdate({_id: body.id},{qty: qty, sum: sum}, callback);
                    }
                } else {
                    callback(new HttpMessage(403, 'Товар не найден'));
                }
            },
            function(goods, callback){
                if(goods){
                    var GoodsTurnover = require('./goodsturnover.js').GoodsTurnover;

                    GoodsTurnover.sale(body, creator, function(err){
                        if(err){
                            return next(new HttpMessage(403, err.message));
                        }
                        callback(null);
                    });
                }
            }
        ], callback);
    };
    
    Goods.statics.supply = function(body, creator, callback) {
        Goods = this;
        
        async.waterfall([
            function(callback){
                Goods.find({_id: body.id}, callback);
            },
            function(goods, callback){
                if(goods){
                    var qty = Number(body.qty)+Number(goods[0].qty),
                        sum = (Math.round(qty*Number(body.price))).toFixed(0);

                    Goods.findOneAndUpdate({_id: body.id},{qty: qty, sum: sum, purchaseprice: body.purchaseprice, price: body.price}, callback);

                } else {
                    callback(new HttpMessage(403, 'Произошла ошибка при проведение поступления'));
                }
            }, 
            function(goods, callback){
                if(goods){
                    var GoodsTurnover = require('./goodsturnover.js').GoodsTurnover;

                    GoodsTurnover.new(body, creator, function(err){
                        if(err){
                            return next(new HttpMessage(403, err.message));
                        }
                        callback(null);
                    });
                }
            }
        ], callback)

    };

        
    Goods.statics.edit = function(body, callback) {
        var Goods = this;

        console.log(body);
        
        async.waterfall([
            function(callback){
                Goods.find({_id: body.id}, callback);
            },
            function(goods, callback){
                if(goods){
                    var goods = goods[0], markup = (Number(body.markup.replace('%',''))+100)/100,
                        price = Math.round(goods.purchaseprice*markup).toFixed(0), sum = Math.round(price*goods.qty).toFixed(0);

                    Goods.findOneAndUpdate({_id: body.id},{sum: sum, price: price, markup: body.markup.replace('%',''), name: body.name, unit: body.unit}, function(err){
                        if(err){
                            callback(new HttpMessage(403, 'Произошла ошибка при  изменение данных товара'));
                        }
                        callback(null);
                    });
                } else {
                    callback(new HttpMessage(403, 'Произошла ошибка при изменение данных товара'));
                }
            }
        ], callback);
    };


    Goods.statics.new = function(body, callback) {
        var Goods = this, goods = new Goods({category: body.category, name: body.name, unit: body.unit, _markup: body.markup});

        goods.save(function(err){
            if(err) return err;
            callback(null);
        });
    };

    Goods.statics.remove = function(body, callback) {
        var Goods = this;

        var GoodsTurnover = require('./goodsturnover.js').GoodsTurnover;

        async.waterfall([
            function(callback){
                GoodsTurnover.find({goods: body.id}, callback);
            },
            function(turnover, callback){
                if(turnover.length == 0){
                    Goods.findOneAndRemove({_id: body.id}, function(err){
                        if(err){
                            callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
                        }
                        callback(null);
                    });
                } else {
                    callback(new HttpMessage(403, 'Удаление невозможно. Товар содержит движение.'));
                }
            }
        ], callback);  
    };


// Exports

    exports.Goods = mongoose.model('Goods', Goods);