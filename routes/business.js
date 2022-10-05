var express = require('express');
var router = express.Router();

/* GET Business page. */
router.get('/', function (req, res, next) {
  var contactList = [{ name: "jhon mcdonals", number: "2313334344", email: "jmc@gmail.com" }, { name: "sara coxwell", number: "34290923344", email: "sra.cw@amazon.com" }];
  res.render('business/business', { title: 'Business', contactList: contactList });
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
