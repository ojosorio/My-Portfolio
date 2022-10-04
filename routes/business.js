var express = require('express');
var router = express.Router();

/* GET Business page. */
router.get('/', function (req, res, next) {
  var contactList = [{ name: "jhon mcdonals", number: "2313334344", email: "jmc@gmail.com" }, { name: "sara coxwell", number: "34290923344", email: "sra.cw@amazon.com" }];
  res.render('business', { title: 'Business', contactList: contactList });
});

module.exports = router;
