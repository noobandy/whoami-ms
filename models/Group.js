/**
 * Created by anandm at 17-Feb-16
 */
var mongoose = require("mongoose");

var GroupSchema = mongoose.Schema({}, {strict: false});

var Group = mongoose.model("Group", GroupSchema);

module.exports = Group;