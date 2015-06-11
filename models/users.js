var crypto = require('crypto'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;


    crypto.randomBytes(8, function(ex, buf) {
        var token = buf.toString('hex');

        console.log(token);
    });

var UserGroup = require('./userGroup.js').UserGroup;

var mongoose = require('../components/mongoose/'),
	Schema = mongoose.Schema,
    Users = new Schema({
  		email: {
  			type: String,
  			unique: true,
  			required: true
  		},
  		name: {
  			type: String,
  			required: true
  		},
  		photo: {
  			type: String
  		},
  		_group: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'UserGroup',
            required: true
        }],
  		created: {
  			type: Date,
  			default: Date.now
  		},
  		salt: {
			type: String,
			required: true
		},
  		hashedPassword: {
			type: String,
			required: true
        }
    });

    // Virtual

    	Users.virtual('password').set(function(password) {
			this._plainPassword = password;
			this.salt = Math.random() + '';
			this.hashedPassword = this.encryptPassword(password);
		}).get(function() {
			return this._plainPassword;
		});

	// Methods

		Users.methods.encryptPassword = function(password) {
    		return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
		};
		Users.methods.checkPassword = function(password) {
			return this.encryptPassword(password) === this.hashedPassword;
		};
		Users.methods.checkEmail = function(email) {
			return this.email === this.email;
		};

    // Statics

        // Аuthorization

            Users.statics.signIn = function(body, callback) {
                var User = this;

                async.waterfall([
                    function(callback){
                        User.findOne({email: body.email}, callback);
                    },
                    function(user, callback){
                        if(user){
                            if(user.checkPassword(body.password)){
                                callback(null, user);
                            } else{
                                callback(new HttpMessage(403, 'Неправильное имя пользователя или пароль'));
                            }
                        } else{
                            callback(new HttpMessage(403, 'Неправильное имя пользователя или пароль'));
                        }
                    }
                ], callback);
            };

        // Registration new user 

            Users.statics.signUp = function(body, callback) {
                var User = this;

                async.waterfall([
                    function(callback){
                        User.findOne({email: body.email}, callback);
                    },
                    function(user, callback){
                        if(!user){
                            var user = new User({name: body.name, email: body.email, password: body.password, _group: body.group});

                            user.save(function(err){
                                if(err) return err;

                                callback(null);
                            });
                        } else{
                            callback(new HttpMessage(403, 'Пользователь с таким <b>E-mail</b> уже существует'));
                        }
                    }
                ], callback);
            };

        // Remove user

            Users.statics.remove = function(body, callback) {
                var User = this;

                async.each(body, function(id, callback){
                    User.findOneAndRemove({_id: id}, callback);
                }, function(err){
                    if(err){
                        callback(new HttpMessage(403, 'Произошла ошибка при удаление, не найден id'));
                    }
                    callback(null);
                });
            };

        // Edit user

            Users.statics.edit = function(body, callback) {
                var User = this;

                async.waterfall([
                    function(callback){
                        User.findOne({_id: body.id}, callback);
                    },
                    function(user, callback){
                        if(!user){return false;}


                        if(body.password){
                            User.findOneAndUpdate({_id: body.id}, {name: body.name, email: body.email, _group: body.group, hashedPassword: user.encryptPassword(body.password) }, function(err){
                                if(err){
                                    callback(new HttpMessage(403, 'Произошла ошибка при изменение пользователя'));
                                }
                                callback(null);
                            });
                        } else{
                            User.findOneAndUpdate({_id: body.id}, {name: body.name, email: body.email, _group: body.group }, function(err){
                                if(err){
                                    callback(new HttpMessage(403, 'Произошла ошибка при изменение пользователя'));
                                }
                                callback(null);
                            });
                        }

                        
                    }
                ], callback);
            };




	// Exports

		exports.Users = mongoose.model('Users', Users);