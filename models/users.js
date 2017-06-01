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
        db.query(`SELECT * FROM users WHERE id="${id}"`, function(err, results){
            const user = results[0];

            db.query(`SELECT * FROM user_group WHERE id="${user.id}"`, function(err, res){
                const group = res[0];

                if(!err && group && user){
                    callback(null, Object.assign({}, user, {
                        _id: user.id,
                        _group: [
                            Object.assign({}, group, {
                                _id: group.id
                            })
                        ]
                    }));
                } else callback(err); 
            });
        })
    }

    getUsers(callback){
        const Users = this;

        db.query(`SELECT id FROM users`, function(err, usersIds){
            if(!err){
                async.map(usersIds, function(user, cb){
                    Users.getUser(user.id, cb);
                }, callback)
            } else callback(err);
        })
    }

}

module.exports = new Users();