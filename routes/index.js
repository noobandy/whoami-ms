"use strict";
var internals = {};

internals.after = function(server, next) {
    server.register({
        register : require("hapi-router"),
        options : {
            routes : "routes/*Routes.js"
        }
    }, function(err) {
        next(err);
    });
};

exports.register = function(server, options, next) {

    server.dependency(["vision","inert"], internals.after);
    next();
};

exports.register.attributes = {
    name : "app-routes"
};