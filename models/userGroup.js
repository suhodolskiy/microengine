var mongoose = require('../components/mongoose/'),
    Schema = mongoose.Schema,
    UserGroup = new Schema({
  		name: {
  			type: String,
  			unique: true,
  			required: true
  		},
        lvl: {
            type: Number,
            required: true
        }
    });

var async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

// Statics
	// New
		UserGroup.statics.add = function(body, callback) {
            var Group = this;

            console.log(body);

            async.waterfall([
                function(callback){
                   Group.findOne({name: body.name}, callback);
                },
                function(group, callback){
                	if(!group){
	        			var group = new Group({name: body.name, lvl: body.lvl});

	        			group.save(function(err){
	        				if(err) return err;
	        				console.log(err);
	        				callback(null);
	        			});
	        		} else{
	        			callback(new HttpMessage(403, 'Группа с таким именем уже существует'));
	        		}
                }
            ], callback);
        };
    // Remove
    	UserGroup.statics.remove = function(body, callback) {
            var Group = this;

            async.each(body, function(id, callback){
                    Group.findOneAndRemove({_id: id}, callback);
            }, function(err){
                if(err){
                    callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
                }
                callback(null);
            });
        };
    // Edit
        UserGroup.statics.edit = function(body, callback) {
            var Group = this;

            Group.findOneAndUpdate({_id: body.id}, {name: body.name, lvl: body.lvl}, function(err){
                if(err){
                    callback(new HttpMessage(403, 'Произошла ошибка при изменение пользователя'));
                }
                callback(null);
            });
        };

// Exports

    exports.UserGroup = mongoose.model('UserGroup', UserGroup);