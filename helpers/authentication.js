"use strict";
var jwt = require("jsonwebtoken");
var Boom = require("boom");

var internals = {};

exports.register = function(server, options, next) {

    server.auth.scheme("jwt", function(server, options) {
        return {
            authenticate : function(request, reply) {
                var token = request.headers.authorization;
                if(!token) {
                    reply(Boom.unauthorized("Missing token", "jwt", {}),{});
                } else {
                    jwt.verify(token.split(" ")[1], options.secret, {algorithm : options.algorithm}, function(err, decoded) {
                        if(err) {
                            return reply(Boom.unauthorized("Wrong token", "jwt", {}),{});
                        }
                        reply.continue({credentials: decoded.username});
                    });
                }
            }
        };
    });

    server.auth.strategy("jwt", "jwt", false, options);

    next();
};

exports.register.attributes = {
  name : "jwt-auth"
};