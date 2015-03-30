var crypto = require('crypto'),
    async = require('async'),
    HttpMessage = require('../../components/error').HttpMessage;

var userGroup = require('./userGroup.js').userGroup;

var mongoose = require('../mongoose'),
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
            ref: 'userGroup' 
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

            Users.statics.signIn = function(email, password, callback) {
                var User = this;

                async.waterfall([
                    function(callback){
                        if(!email && !password){
                            callback(new HttpMessage(403, 'Все поля должны быть заполнены!'));
                        }
                        callback();
                    },
                    function(callback){
                        User.findOne({email: email}, callback);
                    },
                    function(user, callback){
                        if(user){
                            if(user.checkPassword(password)){
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

            Users.statics.signUp = function(email, name, group, password, photo, callback) {

            };

        // Remove user

            Users.statics.remove = function(id ,email, name, callback) {

            };



	// Exports

		exports.Users = mongoose.model('Users', Users);