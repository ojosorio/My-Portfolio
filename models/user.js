let mongoose = require('mongoose');

// create a model class
let userModel = mongoose.Schema({
    active: Boolean,
    email: String,
    password: String,
    username: String,
    name: String,
    phone: String
},
{
    collection: "users"
});

module.exports = mongoose.model('User', userModel);