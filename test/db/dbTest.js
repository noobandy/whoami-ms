"use strict";
var path = require("path");
var Code = require('code');
var Lab = require('lab');
var Hapi = require("hapi");
var config = require(path.join(__dirname, "../../config/config"));

var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var beforeEach = Lab.beforeEach;
var afterEach = Lab.afterEach;
var expect = Code.expect;

describe("db plugin", function() {

    it("loads successfully", function(done) {

        var server = new Hapi.Server();

        server.register({
            register : require(path.join(__dirname, "../../db/db")),
            options : {
                url : config.get("db:url"),
                options : config.get("db:options")
            }
        }, function(err) {

            expect(!err).to.equal(true);
            done(err);
        });
    });

});
