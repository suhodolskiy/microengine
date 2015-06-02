var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage

var Unit = require('./unit.js').Unit,
    GoodsCategories = require('./goodscategories.js').GoodsCategories,
    GoodsTurnover = require('./goodsturnover.js').GoodsTurnover;  

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
                    if(body.qty > goods.qty || body.qty < 0){
                        callback(new HttpMessage(403, 'Недостаточное количество товара на складе (На складе:'+body.qty+')'));    
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

        


    Goods.statics.new = function(body, callback) {
        var Goods = this;

        var goods = new Goods({category: body.category, name: body.name, unit: body.unit, _markup: body.markup});


        goods.save(function(err){
            if(err) return err;
            callback(null);
        });
    };

    Goods.statics.remove = function(body, callback) {
        var Goods = this;

        async.each(body, function(id, callback){
            Goods.findOneAndRemove({_id: id}, callback);
        }, function(err){
            if(err){
                callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
            }
            callback(null);
        });
    };


// Exports

    exports.Goods = mongoose.model('Goods', Goods);