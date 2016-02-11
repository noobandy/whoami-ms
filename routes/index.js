"use strict";

const internals = {};


exports.register = function(server, options, next) {

	server.route({
		method : "GET",
		path : "/",
		config : {
			auth : "jwt",
			handler : function(request, reply) {
				let username = request.auth.credentials;
				reply.view("index", {"title": "Template App", message : "Hello "+username});
			}
		}
	});
};

exports.register.attributes = {
	name : "index-route"
}