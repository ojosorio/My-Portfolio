let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    active: Boolean,
    email: String,
    address: String,
    name: String,
    phone: String
},
{
    collection: "business_contacts"
});

module.exports = mongoose.model('Contact', contactModel);