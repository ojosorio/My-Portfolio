var express = require('express');
var router = express.Router();
//import models
let contact = require("../models/business_contacts");

/* GET Business page. */
router.get('/', function (req, res, next) {
  contact.find((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(contactList);
      res.render('business/business', { title: "Business", contactList: contactList });
    }
  });
});

router.get('/update/:contactId', function (req, res, next) {
  var contactDetails = { name: "jhon mcdonals", number: "2313334344", email: "jmc@gmail.com" };
  console.log("contactId");
  res.render('business/update', { title: 'Business Update', contactDetails: contactDetails });
});

router.get('/delete/:contactId', function (req, res, next) {
  var contactDetails = { name: "jhon mcdonals", number: "2313334344", email: "jmc@gmail.com" };
  console.log("contactId");
  res.render('business/update', { title: 'Business Update', contactDetails: contactDetails });
});

module.exports = router;
