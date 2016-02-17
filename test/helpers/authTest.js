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

describe("auth plugin", function() {

    it("loads successfully", function(done) {

        var server = new Hapi.Server();
        var connection = server.connection({
            host : config.get("server:host"),
            port : config.get("server:port")
        });

        server.register({
            register : require(path.join(__dirname, "../../helpers/authentication")),
            options : {
                secret : config.get("jwt:url"),
                algorithm : config.get("jwt:algorithm")
            }
        }, function(err) {

            expect(!err).to.equal(true);
            done(err);
        });
    });

});
