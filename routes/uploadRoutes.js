//Created by anandm at 22-Feb-16

"use strict";
var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var Upload = require(path.join(__dirname, "../models/Upload"));

var uploadDir = path.join(__dirname, "../public/uploads");

var routes = [{
        method: "GET",
        path: "/uploads",
        config: {
            handler: function (request, reply) {
                var data = request.payload;

                if (data.file) {
                    var name = data.file.hapi.filename;

                    var path = path.join(__dirname, uploadDir, name);

                    var file = fs.createWriteStream(path);

                    file.on('error', function (err) {
                        console.error(err)
                    });

                    data.file.pipe(file);

                    data.file.on('end', function (err) {
                        var ret = {
                            filename: data.file.hapi.filename,
                            headers: data.file.hapi.headers
                        }
                        reply(JSON.stringify(ret));
                    })
                }
                Upload.find({}, function (err, docs) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    return reply(docs);

                });
            },
            description: "Get all Upload",
            notes: "notes",
            tags: ["Upload"]
        }
    }, {
        method: "GET",
        path: "/uploads/{id}",
        config: {
            validate: {
                params: {
                    //mongodb object id
                    id: Joi.string().hex().length(24).required()
                }
            },
            handler: function (request, reply) {
                var id = request.params.id;

                Upload.findById(id, function (err, doc) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    if (!doc) {
                        return reply(Boom.notFound("Not Found"));
                    }

                    return reply(doc);
                })
            },
            description: "Get Upload",
            notes: "notes",
            tags: ["Upload"]
        }
    }, {
        method: "POST",
        path: "/uploads",
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            },
            handler: function (request, reply) {
                var payload = request.payload;

                var resource = new Upload(payload);

                resource.save(function (err, doc) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    return reply(doc);
                });

            },
            description: "Create a new Upload",
            notes: "notes",
            tags: ["Upload"]
        }
    }, {
        method: "PUT",
        path: "/uploads/{id}",
        config: {
            validate: {
                params: {
                    //mongodb object id
                    id: Joi.string().hex().length(24).required()
                }
            },
            handler: function (request, reply) {
                var id = request.params.id;
                var payload = request.payload;

                Upload.update({_id: id}, {
                    $set: payload
                }, function (err, result) {

                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }

                    return reply();
                })
                ;
            },
            description: "Update Upload",
            notes: "notes",
            tags: ["Upload"]
        }
    },
        {
            method: "DELETE",
            path: "/uploads/{id}",
            config: {
                validate: {
                    params: {
                        //mongodb object id
                        id: Joi.string().hex().length(24).required()
                    }
                }
                ,
                handler: function (request, reply) {
                    var id = request.params.id;

                    Upload.remove({_id: id}, function (err, result) {

                        if (err) {
                            return reply(Boom.badImplementation(err));
                        }

                        return reply();
                    });
                }
                ,
                description: "Delete Upload",
                notes: "notes",
                tags: ["Upload"]
            }
        }
    ]
    ;

module.exports = routes;