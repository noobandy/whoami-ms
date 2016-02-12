var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    emailId: {
        type: String
    },
    emailIdVerificationKey: {
        type: String
    },
    emailIdVerified: {
        type: Boolean,
        default: false
    },
    passwordResetKey: {
        type: String
    }
});

UserSchema.statics.register = function(data, callback) {
    var user = new User(data);
    user.save(callback);
};

UserSchema.statics.findByUsername = function (username, callback) {
    this.findOne({"username": username}).select("-password -emailIdVerificationKey -passwordResetKey").exec(callback);
};

UserSchema.methods.checkPassword = function (password, callback) {
    User.findOne({"username": this.username}).exec(function (err, user) {

        if (err) {
            return callback(err);
        }

        return callback(null, user.password === password);
    });
};

UserSchema.methods.changePassword = function (oldPassword, newPassword, callback) {

    var that = this;
    this.checkPassword(oldPassword, function (err, matched) {

        if (err) {
            return callback(err);
        }

        if (matched) {
            that.password = newPassword;

            that.save(function (err, user) {

                if (err) return callback(err);

                return callback(null, true);

            });
        } else {
            return callback(null, false);
        }
    });
};

UserSchema.methods.resetPassword = function (passwordResetKey, newPassword, callback) {
    User.findOne({"username": this.username}).exec(function (err, user) {

        if (err) {
            return callback(err);
        }

        if (user.passwordResetKey && user.passwordResetKey === passwordResetKey) {
            user.password = newPassword;
            user.passwordResetKey = null;
            user.save(function (err, user) {

                if (err) {
                    return callback(err);
                }

                return callback(null, true);
            });
        } else {
            return callback(null, false);
        }
    });
};

UserSchema.methods.verifyEmailId = function (emailIdVerificationKey, callback) {
    User.findOne({"username": this.username}).exec(function (err, user) {

        if (err) {
            return callback(err);
        }

        if (!user.emailIdVerified && user.emailIdVerificationKey === emailIdVerificationKey) {
            user.emailIdVerified = true;
            user.save(function (err, user) {
                
                if (err) {
                    return callback(err);
                }

                return callback(null, true);
            });
        } else {
            return callback(null, false);
        }
    });

};

UserSchema.methods.isAccountEnabled = function() {
  return this.emailIdVerified;
};

var User = mongoose.model("User", UserSchema);

module.exports = User;