"use strict";

var path = require("path");
var Hapi = require("hapi");
var Hoek = require("hoek");

var config = require(path.join(__dirname, "config/config"));

var internals = {

};

var server = new Hapi.Server();

var connection = server.connection({
	host : config.get("server:host"),
	port : config.get("server:port")
});

//db
server.register({
    register: require(path.join(__dirname, "db/db")),
    options : {
        url : config.get("db:url"),
        options : config.get("db:options")
    }
}, function(err) {
   Hoek.assert(!err, err);
});

//authentication
server.register({
    register : require(path.join(__dirname, "helpers/authentication")),
    options : {
        secret : config.get("jwt:secret"),
        algorithm : config.get("jwt:algorithm")
    }
}, function(err) {
    Hoek.assert(!err, err);
});

//static content
server.register(require('inert'), function(err) {

    Hoek.assert(!err, err);
});

//server view engine
server.register(require('vision'), function(err) {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars'),
        },
        relativeTo: __dirname,
        path: 'views'
    });
});

//route configuration
server.register(require(path.join(__dirname, "routes")), function(err) {

    Hoek.assert(!err, err);
});

// Start the server
server.start(function(err) {

    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
});

module.exports = server;
