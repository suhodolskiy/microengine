const HttpMessage = require('../components/error/').HttpMessage;
const db = require('../components/mysql');
const nodemailer = require('nodemailer');
const config = require('config');
const crypto = require('crypto');
const async = require('async');

function encryptPassword(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

function checkPassword(password, salt, hashedPassword){
    return encryptPassword(password, salt) === hashedPassword;
}

class Users {

    constructor(){
        this.signIn = this.signIn.bind(this);
    }

    signIn(params, callback){
        async.waterfall([
            function(cb){
                if(typeof params.email !== undefined || typeof params.password !== undefined){
                    db.query(`SELECT * FROM users WHERE email="${params.email}"`, function(err, results){
                        if(!err){
                            cb(null, results[0]);
                        } else cb(err);
                    })
                }
            },
            function(user, cb){
                if(user){
                    if(checkPassword(params.password, user.salt, user.hashedPassword)){
                        callback(null, Object.assign({}, user, {
                            _id: user.id
                        }));
                    } else{
                        callback(new HttpMessage(403, 'Неправильное имя пользователя или пароль'));
                    }
                } else{
                    callback(new HttpMessage(403, 'Неправильное имя пользователя или пароль'));
                }
            }
        ], callback);
    }

    getUser(id, callback){
        db.query(`SELECT *, id AS _id FROM users WHERE id="${id}"`, function(err, results){
            const user = results[0];

            db.query(`SELECT *, id AS _id FROM user_group WHERE id="${user._group}"`, function(err, res){
                const group = res[0];

                if(!err && group && user){
                    user._group = [group];

                    callback(null, user);
                } else callback(err); 
            });
        })
    }

    getUsers(callback){
        const Users = this;

        db.query(`SELECT id FROM users`, function(err, usersIds){
            if(!err){
                async.map(usersIds, function(userId, cb){
                    Users.getUser(userId.id, cb);
                }, callback)
            } else callback(err);
        })
    }

    edit(body, callback){
        const Users = this;

        console.log(body);

        if(body.password && body.password.length){
            const salt = Math.random().toString();
            const hashedPassword = encryptPassword(body.password, salt);
            
            db.query(`UPDATE users SET email="${body.email}", name="${body.name}", _group="${body.group}", salt="${salt}", hashedPassword="${hashedPassword}" WHERE id="${body.id}"`, callback);
        } else {
            db.query(`UPDATE users SET email="${body.email}", name="${body.name}", _group="${body.group}" WHERE id="${body.id}"`, callback);
        }
    }

    create(body, callback){
        const salt = Math.random().toString();
        const hashedPassword = encryptPassword(body.password, salt);
        db.query(`INSERT INTO users (email, name, _group, salt, hashedPassword) VALUES ("${body.email}", "${body.name}", "${body.group}", "${salt}", "${hashedPassword}")`, callback);
    }

    delete(body, callback){
        db.query(`DELETE FROM users WHERE id="${body[0]}"`, callback);
    }

}

module.exports = new Users();