"use strict";
var path = require("path");

var routes = [{
	method : "GET",
	path : "/",
	config : {
		handler : function(request, reply) {
			reply.file(path.join(__dirname, "../views/index.html"));
		}
	}
}, {
	method : "GET",
    path : "/admin",
    config : {
        handler : function(request, reply) {
            reply.file(path.join(__dirname, "../views/admin.html"));
        }
    }
}];

module.exports = routes;