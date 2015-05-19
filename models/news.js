var mongoose = require('../mongoose');

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
            type: String,
            required: true
        },
        publish: {
            type: Boolean,
            required: true
        }
    });

// Exports

    exports.News = mongoose.model('News', News);