/**
 * Created by anandm at 16-Feb-16
 */
var mongoose = require("mongoose");

var MessageSchema = mongoose.Schema({}, {strict: false});

var Message = mongoose.model("Message", MessageSchema, "messages");

module.exports = Message;