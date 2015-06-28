var crypto = require('crypto'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage,
    nodemailer = require('nodemailer'),
    config = require('config');

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
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
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

        var smtpTransport = nodemailer.createTransport({
            service: config.get('nodemailer.service'),
            auth: {
                user: config.get('nodemailer.auth.user'),
                pass: config.get('nodemailer.auth.pass')
            }
        });
        
        // Reset password

            Users.statics.reset = function(password, token, callback){
                var User = this;

                async.waterfall([
                    function(callback){
                        User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                            if(!user) {
                                return res.redirect('/micro/login');
                            }
                            user.password = password;
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.save(function(err) {
                                callback(err, user);
                            });
                        });
                    },
                    function(user, callback){
                        var mailOptions = {
                            to: user.email,
                            from: config.get('nodemailer.auth.user'),
                            subject: 'Ваш пароль был изменен',
                            text: 'Привет,\n\n' +
                            'Это подтверждение того, что пароль для вашей учетной записи ' + user.email + ' был изменен.\n'
                        };

                        smtpTransport.sendMail(mailOptions, function(err) {
                            callback(null);
                        });
                    }
                ], callback);                    
            };

        // Forgot password

            Users.statics.forgot = function(email, host, callback){
                var User = this;

                async.waterfall([
                    function(callback){
                        crypto.randomBytes(20, function(err, buf) {
                            var token = buf.toString('hex');
                            callback(err, token);
                        });
                    },
                    function(token, callback){
                        User.findOne({email: email}, function(err, user){
                            console.log(user);
                            if (!user) {
                                callback(new HttpMessage(403, 'Пользователь с таким E-mail не найден'));
                            }
                            user.resetPasswordToken = token;
                            user.resetPasswordExpires = Date.now() + 3600000;

                            user.save(function(err) {
                                callback(err, token, user);
                            });
                        });
                    },
                    function(token, user, callback){
                        var mailOptions = {
                            to: user.email,
                            from: 'app.microengine@gmail.com',
                            subject: 'Microengine сброс пароля',
                            text: ' Вы получили это письмо, потому что вы (или кто-то еще) запросили сброс пароля для учетной записи.\n\n' +
                            'Пожалуйста, нажмите на следующую ссылку, или вставить это в вашем браузере, чтобы завершить процесс:\n\n' +
                            'http://' + host + '/micro/reset/' + token + '\n\n' +
                            'Если вы не просили это, пожалуйста, проигнорируйте это письмо и ваш пароль будет оставаться без изменений.\n'
                        };
                        smtpTransport.sendMail(mailOptions, function(err) {
                            callback(null);
                        });
                    }
                ], callback);
            };

        // Аuthorization

            Users.statics.signIn = function(body, callback) {
                var User = this;

                async.waterfall([
                    function(callback){
                        if(body.email.length || body.password.length){
                            User.findOne({email: body.email}, callback);
                        } else {
                            callback(new HttpMessage(403, 'Поля должны быть заполнены'));
                        }
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