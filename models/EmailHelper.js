var jade = require("jade");
var path = require("path");
var config = require("config");
var nodeMailer = require("nodemailer");
var smtpPool = require("nodemailer-smtp-pool");

var transporter = nodeMailer.createTransport(smtpPool(config.get("smtpConfig")));


var activationMailTemplate = jade.compileFile(path.join(__dirname, "../email-templates/activation/index.jade"));
var passwordResetMailTemplate = jade.compileFile(path.join(__dirname, "../email-templates/password-reset/index.jade"));

var sendVerificationEmail = function(emailId, username, key, callback) {
    var activationLink = config.get("basePath") + "/verifyemail/"+username+"/"+key;
    var html = activationMailTemplate({username : username, activationLink : activationLink });
    transporter.sendMail({
        to: emailId,
        subject: "Account Activation",
        html: html
    },callback);
};


var sendPasswordResetEmail = function(emailId, username, key, callback) {
    var passwordResetLink = config.get("basePath") + "/resetpassword/"+username+"/"+key;
    var html = passwordResetMailTemplate({username : username, passwordResetLink : passwordResetLink });
    transporter.sendMail({
        to: emailId,
        subject: "Password Reset",
        html: html
    }, callback);
};

module.exports = {
	sendVerificationEmail : sendVerificationEmail,
	sendPasswordResetEmail : sendPasswordResetEmail
};