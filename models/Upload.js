/**
 * Created by anandm at 22-Feb-16
 */
var mongoose = require("mongoose");

var UploadSchema = mongoose.Schema({
    originalFileName : {
        type : String
    }
});

var Upload = mongoose.model("Upload", UploadSchema);

module.exports = Upload;