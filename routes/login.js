var express = require('express');
var router = express.Router();
let passport = require("passport");

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/* POST auth process. */
router.post("/", passport.authenticate("local", {
  successRedirect: "/business",
  failureRedirect: "/login"
}), function (req, res) {
});

/* GET logout process. */
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/business');
  });
});

module.exports = router;