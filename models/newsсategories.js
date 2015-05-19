var mongoose = require('../mongoose'),
    Schema = mongoose.Schema,
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
  		description : {
  			type: String
  		}
    });

// Exports

    exports.NewsCategories = mongoose.model('NewsCategories', NewsCategories);