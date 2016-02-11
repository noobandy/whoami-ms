"use strict";

const MongoDB = require("mongodb");

const internals = {
	connection : null,
	MongoClient : MongoDB.MongoClient
};

internals.init = function(url, options, callback) {
	if(internals.connection) {
		return callback(null, internals.connection);
	} else {
		internals.MongoClient.connect(url, function(err, database) {
			
			if(err) {
				return callback(err);
			}

			internals.connection = database;

			return callback(null, database);
		});
	}
	
};

module.exports.init = internals.init;

module.exports.connection = internals.connection;

