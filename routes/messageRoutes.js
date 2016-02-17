//Created by anandm at 16-Feb-16

"use strict";
var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var Message = require(path.join(__dirname, "../models/Message"));

var routes = [{
    method: "GET",
    path: "/messages",
    config: {
        handler: function (request, reply) {
            Message.find({}, function (err, docs) {

                if (err) {
                    return Boom.badImplementation(err.message);
                }

                return reply(docs);

            });
        },
        description: "Get all Message",
        notes: "notes",
        tags: ["Message"]
    }
}, {
    method: "GET",
    path: "/messages/{id}",
    config: {
        handler: function (request, reply) {
            var id = request.params.id;

            Message.findById(id, function (err, doc) {

                if (err) {
                    return Boom.badImplementation(err.message);
                }

                return reply(doc);
            })
        },
        description: "Get Message",
        notes: "notes",
        tags: ["Message"]
    }
}, {
    method: "POST",
    path: "/messages",
    config: {
        handler: function (request, reply) {
            var payload = request.payload;

            var resource = new Message(payload);

            resource.save(function (err, doc) {

                if (err) {
                    return reply(Boom.badImplementation(err.message));
                }

                return reply(doc);
            });

        },
        description: "Create a new Message",
        notes: "notes",
        tags: ["Message"]
    }
}, {
    method: "PUT",
    path: "/messages/{id}",
    config: {
        handler: function (request, reply) {
            var id = request.params.id;
            var payload = request.payload;

            Message.findByIdAndUpdate(id, payload, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err.message));
                }

                return reply(result);
            });
        },
        description: "Update Message",
        notes: "notes",
        tags: ["Message"]
    }
}, {
    method: "DELETE",
    path: "/messages/{id}",
    config: {
        handler: function (request, reply) {
            var id = request.params.id;

            Message.findByIdAndRemove(id, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err.message));
                }

                return reply(result);
            });
        },
        description: "Delete Message",
        notes: "notes",
        tags: ["Message"]
    }
}];

module.exports = routes;