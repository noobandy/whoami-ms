var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var User = require(path.join(__dirname, "../models/user"));

var routes = [{
	method : "POST",
	path : "/users",
	config : {
		validate : {
			payload : {
                username : Joi.string().min(6),
                password : Joi.string().min(6),
                emailId : Joi.string().required()
			}
		},
		handler : function(request, reply) {
            User.register(request.payload, function(err, user) {

                if(err) {
                    return reply(Boom.badImplementation(err.message));
                }
                //send activation link

                //clear password filed
                delete user.password;

                reply(user);
            });
		}
	}
}, {
	method : "PUT",
	path : "/users/{id}",
	config : {
		validate : {
			params : {

			},
			payload : {

			}
		},
		handler : function(request, reply) {

        }
	}
}, {
	method : "DELETE",
	path : "/users/{id}",
	config : {
		validate : {
			params : {

			}
		},
		handler : function(request, reply) {

        }
	}
}];

module.exports = routes;