"use strict";

var path = require("path");
var Hapi = require("hapi");
var Hoek = require("hoek");

var server = new Hapi.Server();

var connection = server.connection({
	host : process.env.IP,
	port : process.env.PORT || 8080
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

//lout documentation
server.register(require("lout"), function (err) {

    Hoek.assert(!err, err);
});

//logging

var reporters = [];

if(process.env == "prod") {
    reporters.push({
        reporter : require("good-file"),
        events : { log : "*", request : "*" },
        config: 'server_log'
    });
} else {
    reporters.push({
        reporter : require("good-console"),
        events : { log : "*", request : "*" }
    });
}
server.register({

    register : require("good"),
    options : {
        opsInterval : 1000,
        reporters : reporters
    }
}, function(err) {

    Hoek.assert(!err, err);
});

// Start the server
server.start(function(err) {

    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
});


//handle SIGINT and SIGTERM for graceful termination
var shutdown = function() {
    //5 second
    console.log("stopping server");
    server.stop({ timeout: 5 * 1000}, function(){
        console.log("server stopped");
        process.exit(0);
    });
};

process.on("SIGINT", function() {
    shutdown();
});

process.on("SIGTERM", function() {
    shutdown();
});


module.exports = server;
