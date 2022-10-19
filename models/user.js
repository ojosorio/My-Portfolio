let mongoose = require('mongoose');
let passportLocalMongoose = require("passport-local-mongoose");

// create a model class
let userModel = mongoose.Schema({
    active: Boolean,
    email: String,
    password: {
        type: String,
        default: "",
        trim: true,
        required: "password is required",
    },
    username: {
        type: String,
        default: "",
        trim: true,
        required: "username is required",
    },
    name: String,
    phone: String
}, {
    collection: "users"
});

let options = { missingPasswordError: "Wrong / Missing Password" };
userModel.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', userModel);