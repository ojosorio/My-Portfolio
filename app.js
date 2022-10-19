//common packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// auth setup
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStratergy = passportLocal.Strategy;
let flash = require("connect-flash");

//database setup
let mongoose = require("mongoose");
let DB = require("./db");

//mongoose connection 
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
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

//setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//initialize flash
app.use(flash());

//intialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//create usermodel instance
let userModel = require("./models/user");
// let User = userModel.User;

//implement a user authenticaion Strategy
// passport.use(User.createStrategy());
passport.use(new localStratergy(userModel.authenticate()));

//serialize and deserialize user object info -encrypt and decrypt
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/projects', projectsRouter);
app.use('/services', servicesRouter);
app.use('/business', businessRouter);
app.use('/login', loginRouter);

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
