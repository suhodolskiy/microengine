var mongoose = require('../components/mongoose'),
    HttpMessage = require('../components/error/').HttpMessage;

var Schema = mongoose.Schema,
    Events = new Schema({
  		title: {
            type: String,
            required: true
        },
        start: {
            type: Date,
            require: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

// Statics

    Events.statics.new = function(body, callback) {
        var Event = this,
            _event = new Event({title: body.title, start: body.start});

            _event.save(function(err){
                if(err) return err;
                callback(null);
            });
    };

    Events.statics.remove = function(body, lvl, callback) {
        var Event = this;

        if(lvl == 1){
            Event.findOneAndRemove({_id: body.id}, function(err){
                if(err) return err;
                callback(null);
            });
        } else {
            callback(new HttpMessage(403, 'Ваш уровень доступа не позволяет выполнить данное действие'))
        }

       
    };

// Exports

    exports.Events = mongoose.model('Events', Events);
