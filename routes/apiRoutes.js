"use strict";
var path = require("path");
var moment = require("moment");
var Joi = require("joi");

var routes = [{
	method: "GET",
	path: "/api/whoami",
	config: {
		handler: function(request, reply) {
			var ipaddress = request.headers["x-forwarded-for"];
			var language = request.headers["accept-language"].split(",")[0];
			var software = request.headers["user-agent"].substring(request.headers["user-agent"].indexOf("(") + 1, request.headers["user-agent"].indexOf(")"));
			console.log(request.headers);

			reply({
				ipaddress: ipaddress,
				language: language,
				software: software
			});
		}
	}
}];

module.exports = routes;