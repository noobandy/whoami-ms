//Created by anandm at 23-Feb-16

"use strict";
var fs = require("fs");
var path = require("path");
var Joi = require("joi");
var Boom = require("boom");

var Upload = require(path.join(__dirname, "../models/Upload"));

var getFilePath = function (id, originalFileName) {
    var filePath = id;
    var tokens = originalFileName.split(".");
    if (tokens.length > 0) {
        var extension = tokens[tokens.length - 1];
        filePath = filePath + "." + extension;
    }

    return path.join(__dirname, "../public/uploads/", filePath);
};

var routes = [{
    method: "GET",
    path: "/uploads",
    config: {
        handler: function (request, reply) {
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
    method: "GET",
    path: "/uploads/{id}/data",
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

                var filePath = getFilePath(doc._id, doc.originalFileName);
                return reply.file(filePath);
            })
        },
        description: "Get Upload data",
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

            //create upload document
            /* { originalFileName , size}
             */
            //save document
            //resolve path
            //move file to path
            //send response

            var payload = request.payload;

            var resource = new Upload({ originalFileName :  payload.file.hapi.filename});

            resource.save(function (err, doc) {

                if (err) {
                    return reply(Boom.badImplementation(err));
                }


                var filePath = getFilePath(doc._id, doc.originalFileName);

                var file = fs.createWriteStream(filePath);

                file.on('error', function (err) {
                    return reply(Boom.badImplementation(err));
                });

                request.payload.file.pipe(file);

                request.payload.file.on('end', function (err) {
                    return reply(doc);
                });
            });
        },
        description: "Create a new Upload",
        notes: "notes",
        tags: ["Upload"]
    }
}];

module.exports = routes;