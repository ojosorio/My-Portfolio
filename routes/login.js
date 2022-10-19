var express = require('express');
var router = express.Router();
let passport = require("passport");

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post("/", function (req, res) {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" })
  }
  else if (!req.body.password) {
    res.json({ success: false, message: "Password was not given" })
  }
  else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err });
      }
      else {
        if (!user) {
          res.json({ success: false, message: "username or password incorrect" });
        }
        else {
          // const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
          res.json({ success: true, message: "Authentication successful", token: "token" });
        }
      }
    })(req, res);
  }
});

module.exports = router;