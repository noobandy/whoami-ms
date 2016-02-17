"use strict";
var path = require("path");
var Code = require('code');
var Lab = require('lab');
var server = require(path.join(__dirname, "../../server"));
var Message = require(path.join(__dirname, "../../models/Message"));
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe("users", function() {
   //before
    before(function(done) {
        Message.collection.remove({}, function(err, result) {
            done(err);
        });
    });

    //after
    after(function(done) {
        Message.collection.remove({}, function(err, result) {
            done(err);
        });
    });


    describe("Message", function() {

        it("Get all Message", function(done) {

            var options = {
                method : "GET",
                url : "/messages"
            };
            
            server.inject(options, function (response) {

                expect(response.statusCode).to.equal(200);

                //array of zero length
                expect(response.result.length).to.equal(0);

                var message = new Message({});
                message.save(function(err, message) {

                    if(err) {
                        return done(err);
                    }

                    server.inject(options, function(response) {

                        expect(response.statusCode).to.equal(200);

                        //array of zero length
                        expect(response.result.length).to.equal(1);

                        done();

                    });

                });

            });
        });
    });
});



