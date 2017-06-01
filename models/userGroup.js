const HttpMessage = require('../components/error/').HttpMessage;
const db = require('../components/mysql');
const async = require('async');

class Groups {

    constructor(){
        
    }

    getGroup(id, callback){
        db.query(`SELECT *, id AS _id FROM user_group WHERE id="${id}"`, function(err, results){
            callback(err, results[0]);
        })
    }

    getGroups(callback){
        db.query(`SELECT *, id AS _id FROM user_group`, callback);
    }

    edit(body, callback){
        db.query(`UPDATE user_group SET name="${body.name}", lvl="${body.lvl}" WHERE id="${body.id}"`, callback);
    }

    create(body, callback){
        db.query(`INSERT INTO user_group (name, lvl) VALUES ("${body.name}", "${body.lvl}")`, callback);
    }

    delete(body, callback){
        db.query(`DELETE FROM user_group WHERE id="${body[0]}"`, callback);
    }

}

module.exports = new Groups();

// var mongoose = require('../components/mongoose/'),
//     Schema = mongoose.Schema,
//     UserGroup = new Schema({
//   		name: {
//   			type: String,
//   			unique: true,
//   			required: true
//   		},
//         lvl: {
//             type: Number,
//             required: true
//         }
//     });

// // Statics
// 	// New
// 		UserGroup.statics.add = function(body, callback) {
//             var Group = this;

//             console.log(body);

//             async.waterfall([
//                 function(callback){
//                    Group.findOne({name: body.name}, callback);
//                 },
//                 function(group, callback){
//                 	if(!group){
// 	        			var group = new Group({name: body.name, lvl: body.lvl});

// 	        			group.save(function(err){
// 	        				if(err) return err;
// 	        				console.log(err);
// 	        				callback(null);
// 	        			});
// 	        		} else{
// 	        			callback(new HttpMessage(403, 'Группа с таким именем уже существует'));
// 	        		}
//                 }
//             ], callback);
//         };
//     // Remove
//     	UserGroup.statics.remove = function(body, callback) {
//             var Group = this;

//             async.each(body, function(id, callback){
//                     Group.findOneAndRemove({_id: id}, callback);
//             }, function(err){
//                 if(err){
//                     callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
//                 }
//                 callback(null);
//             });
//         };
//     // Edit
//         UserGroup.statics.edit = function(body, callback) {
//             var Group = this;

//             Group.findOneAndUpdate({_id: body.id}, {name: body.name, lvl: body.lvl}, function(err){
//                 if(err){
//                     callback(new HttpMessage(403, 'Произошла ошибка при изменение пользователя'));
//                 }
//                 callback(null);
//             });
//         };

// // Exports

//     exports.UserGroup = mongoose.model('UserGroup', UserGroup);