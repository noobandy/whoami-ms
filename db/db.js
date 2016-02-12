"use strict";

var mongoose = require("mongoose");

exports.register = function(server, options, next) {

	var db = mongoose.connect(options.url, options.options).connection;

	db.on("error", console.error.bind(console, "connection error"));

	//When conection is opened
    db.once("open", function (callback) {
    });
    // When the connection is disconnected
    db.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        db.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    next();
};

exports.register.attributes = {
	name : "mongoose-connection"
};
