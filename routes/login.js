var path = require("path");
var jwt = require("jsonwebtoken");
var Boom = require("boom");
var Joi = require("joi");

var config = require(path.join(__dirname, "../config/config"));

var user = require(path.join(__dirname, "../models/user"));

var routes = [{
	method : "POST",
	path : "/authenticate",
	handler : function(request, reply) {
		var username = request.payload.username;
		var password = request.payload.password;

		user.verifyPassword(username, password, function(err, verified) {
			if(err) {
				console.log(err);
				return reply(err);
			}

			if(verified) {
				var secret = config.get("jwt:secret");
				var algo = config.get("jwt:algorithm");

				jwt.sign({ username: username }, secret, { algorithm:  algo}, function(token) {
					return reply({"token" : token});
				});

			} else {
				return reply(Boom.unauthorized("wrong credentials"));
			}
		});
	},
	config : {
		auth : false,
		validate : {
			payload : {
				username : Joi.string().required(),
				password : Joi.string().required()
			}
		}
	}
}];

module.exports = routes;