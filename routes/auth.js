var express = require('express');
var router = express.Router();
let passport = require("passport");

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', error: req.query.error });
});

/* POST auth process. */
router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }

    if (!user) {
      return res.redirect('/auth/login?error=' + info.message);
    }

    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/business');
    });

  })(req, res, next);
});

/* GET logout process. */
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/business');
  });
});

module.exports = router;