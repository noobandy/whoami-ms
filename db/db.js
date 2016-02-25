"use strict";

var mongoose = require("mongoose");

exports.register = function(server, options, next) {

	var db = mongoose.connect(options.url, options.options).connection;

	db.on("error", console.error.bind(console, "connection error"));


    //if server is stopping
    server.ext('onPreStop', function (server, next) {
        db.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            next();
        });
    });

    next();
};

exports.register.attributes = {
	name : "mongoose-connection"
};
