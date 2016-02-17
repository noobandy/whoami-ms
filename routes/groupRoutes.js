//Created by anandm at 17-Feb-16

"use strict";
var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var Group = require(path.join(__dirname, "../models/Group"));

var routes = [{
    method: "GET",
    path: "/groups",
    config: {
        handler: function (request, reply) {
            Group.find({}, function (err, docs) {

                if (err) {
                    return Boom.badImplementation(err.message);
                }

                return reply(docs);

            });
        },
        description: "Get all Group",
        notes: "notes",
        tags: ["Group"]
    }
}, {
    method: "GET",
    path: "/groups/{id}",
    config: {
        handler: function (request, reply) {
            var id = request.params.id;

            Group.findById(id, function (err, doc) {

                if (err) {
                    return Boom.badImplementation(err.message);
                }

                return reply(doc);
            })
        },
        description: "Get Group",
        notes: "notes",
        tags: ["Group"]
    }
}, {
    method: "POST",
    path: "/groups",
    config: {
        handler: function (request, reply) {
            var payload = request.payload;

            var resource = new Group(payload);

            resource.save(function (err, doc) {

                if (err) {
                    return reply(Boom.badImplementation(err.message));
                }

                return reply(doc);
            });

        },
        description: "Create a new Group",
        notes: "notes",
        tags: ["Group"]
    }
}, {
    method: "PUT",
    path: "/groups/{id}",
    config: {
        handler: function (request, reply) {
            var id = request.params.id;
            var payload = request.payload;

            Group.findByIdAndUpdate(id, payload, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err.message));
                }

                return reply(result);
            });
        },
        description: "Update Group",
        notes: "notes",
        tags: ["Group"]
    }
}, {
    method: "DELETE",
    path: "/groups/{id}",
    config: {
        handler: function (request, reply) {
            var id = request.params.id;

            Group.findByIdAndRemove(id, function (err, result) {

                if (err) {
                    return reply(Boom.badImplementation(err.message));
                }

                return reply(result);
            });
        },
        description: "Delete Group",
        notes: "notes",
        tags: ["Group"]
    }
}];

module.exports = routes;