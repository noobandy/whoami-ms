var path = require("path");
var jwt = require("jsonwebtoken");
var Boom = require("boom");
var Joi = require("joi");

var config = require(path.join(__dirname, "../config/config"));

var routes = [{
	method : "POST",
	path : "/authenticate",
	handler : function(request, reply) {
		var username = request.payload.username;
		var password = request.payload.password;

		if(username === "anandm" && password === "anandm") {
			var secret = config.get("jwtSecret");
			var algo = config.get("jwtAlgorithm");
			jwt.sign({ username: username }, secret, { algorithm:  algo}, function(token) {
					reply({"token" : token});
			});

		} else {
			reply(Boom.unauthorized("wrong credentials"));
		}
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