var mongoose = require('../mongoose'),
    Schema = mongoose.Schema,
    StaticPages = new Schema({
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
        _author: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Users',
            required: true
        }],
        created: {
            type: Date,
            default: Date.now
        },
        description : {
            type: String
        },
        text: {
            type: String,
            required: true
        }
    });

// Exports

    exports.StaticPages = mongoose.model('StaticPages', StaticPages);