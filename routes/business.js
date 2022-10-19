var express = require('express');
var router = express.Router();
//import models
let contact = require("../models/business_contacts");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  console.log(req);
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Business page. */
router.get('/', requireAuth, function (req, res, next) {
  contact.find().sort('name').exec((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(contactList);
      res.render('business/business', { title: "Business", contactList: contactList });
    }
  });
});

router.post('/update', requireAuth, function (req, res, next) {
  let updatedContact = contact({
    _id: req.body.id,
    email: req.body.email,
    address: req.body.address,
    name: req.body.name,
    phone: req.body.phone
  });

  console.log("updateContact: " + updatedContact);
  contact.updateOne({ _id: updatedContact._id }, updatedContact, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating");
    }
    else {
      res.status(200).send("success");
    }
  });
});

router.get('/update/:contactId', requireAuth, function (req, res, next) {
  let id = req.params.contactId;
  console.log("_id: " + id);
  contact.findById(id, (err, contactDetail) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //return the edit view
      console.log(contactDetail);
      res.render('business/update', { title: 'Business Contact', contactDetail: contactDetail });
    }
  });
});

router.get('/delete/:contactId', requireAuth, function (req, res, next) {
  let id = req.params.contactId;

  contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/business");
    }
  });
});

module.exports = router;
