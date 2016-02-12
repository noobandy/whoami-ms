var path = require("path");
var jwt = require("jsonwebtoken");
var Boom = require("boom");
var Joi = require("joi");
var Hoek = require("hoek");

var config = require(path.join(__dirname, "../config/config"));

var User = require(path.join(__dirname, "../models/user"));

var routes = [{
	method : "POST",
	path : "/authenticate",
	config : {
        auth : false,
        validate : {
            payload : {
                username : Joi.string().required(),
                password : Joi.string().required()
            }
        },
        handler : function(request, reply) {
            var username = request.payload.username;
            var password = request.payload.password;

            User.findByUsername(username, function(err, user) {
                if(err) {
                    reply(Boom.badImplementation(err.message));
                }

                if(user && user.isAccountEnabled()) {
                    user.checkPassword(password, function(err, verified) {

                        if(err) {
                            reply(Boom.badImplementation(err.message));
                        }

                        if(verified) {
                            var secret = config.get("jwt:secret");
                            var algorithm = config.get("jwt:algorithm");

                            jwt.sign({ username: username }, secret, { algorithm:  algorithm}, function(token) {

                                return reply({"token" : token});
                            });
                        } else {
                            return reply(Boom.unauthorized("wrong credentials"));
                        }
                    });
                } else {
                    return reply(Boom.unauthorized("wrong credentials"));
                }
            });
        }
    }
}];

module.exports = routes;