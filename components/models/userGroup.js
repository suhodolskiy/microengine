var mongoose = require('../mongoose'),
    Schema = mongoose.Schema,
    userGroup = new Schema({
  		name: {
  			type: String,
  			unique: true,
  			required: true
  		}
    });

// Exports

    exports.userGroup = mongoose.model('userGroup', userGroup);