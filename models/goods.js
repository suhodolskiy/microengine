var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage

var Unit = require('./unit.js').Unit,
    GoodsCategories = require('./goodscategories.js').GoodsCategories;    

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
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        unit: {
            type: String,
            required: true,
            default: 'шт'
        },
        purchaseprice: {
            type: Number,
            required: true
        },
        markup: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        only: {
            type: Number,
            required: true
        }
    });


// Exports

    exports.Goods = mongoose.model('Goods', Goods);