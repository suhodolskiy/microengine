const HttpMessage = require('../components/error/').HttpMessage;
const db = require('../components/mysql');
const async = require('async');

class Events {

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

module.exports = new Events();

// var Schema = mongoose.Schema,
//     Events = new Schema({
//   		title: {
//             type: String,
//             required: true
//         },
//         start: {
//             type: Date,
//             require: true
//         },
//         created: {
//             type: Date,
//             default: Date.now
//         }
//     });

// // Statics

//     Events.statics.new = function(body, callback) {
//         var Event = this,
//             _event = new Event({title: body.title, start: body.start});

//             _event.save(function(err){
//                 if(err) return err;
//                 callback(null);
//             });
//     };

//     Events.statics.remove = function(body, lvl, callback) {
//         var Event = this;

//         if(lvl == 1){
//             Event.findOneAndRemove({_id: body.id}, function(err){
//                 if(err) return err;
//                 callback(null);
//             });
//         } else {
//             callback(new HttpMessage(403, 'Ваш уровень доступа не позволяет выполнить данное действие'))
//         }

       
//     };

// // Exports

//     exports.Events = mongoose.model('Events', Events);
