// common packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

// auth setup
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var passport = require("passport");
var passportLocal = require("passport-local");
var localStratergy = passportLocal.Strategy;

// database setup
var mongoose = require("mongoose");
var DB = require("./db");

// mongoose connection 
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error:"));
mongodb.once("open", () => {
  console.log("Database Connected");
});

// routing
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var projectsRouter = require('./routes/projects');
var servicesRouter = require('./routes/services');
var businessRouter = require('./routes/business');
var authRouter = require('./routes/auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

// setup express session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 10 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// passport configuration
// intialize passport
app.use(passport.initialize());
app.use(passport.session());

// authentication strategy implementation
passport.use(new localStratergy((username, password, done) => {
  // database validation goes here
  // this assignment does not cover validation as it is not required
  // any username and password return successful
  return done(null, username);
}));

// serialize and deserialize user object
passport.serializeUser(function (user, callback) {
  process.nextTick(function () {
    callback(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, callback) {
  process.nextTick(function () {
    return callback(null, user);
  });
});

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/projects', projectsRouter);
app.use('/services', servicesRouter);
app.use('/business', businessRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
