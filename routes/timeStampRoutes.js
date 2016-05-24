"use strict";
var path = require("path");
var moment = require("moment");
var Joi = require("joi");

var routes = [{
	method: "GET",
	path: "/{day}",
	config: {
		validate: {
			params: {
				day: Joi.string().required()
			}
		},
		handler: function(request, reply) {
			var day = request.params.day;

			var unix = null;
			var natural = null;


			if (isNaN(day)) {
				natural = day;
				unix = moment(day, "MMMM DD, YYYY").unix();

			}
			else {
				unix = parseInt(day);
				natural = moment(day, "X").format("MMMM DD, YYYY");
			}


			reply({
				unix: unix,
				natural: natural
			});
		}
	}
}];

module.exports = routes;