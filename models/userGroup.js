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