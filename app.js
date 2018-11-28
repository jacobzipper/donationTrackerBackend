var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');
var cors = require ('cors');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var employeeRouter = require('./routes/employee');
var managerRouter = require('./routes/manager');

var app = express();

const PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const jwtAuth = jwt({secret: new Buffer(PUBLIC_KEY), issuer: 'scrumlords'});

app.use('/',
  indexRouter);
app.use('/users',
  jwtAuth,
  function(req, res, next) {
    if (req.user.role != 'users') {
        console.log(req.user);
        return res.sendStatus(401);
    }
    next();
  },
  indexRouter,
  userRouter);
app.use('/employees',
  jwtAuth,
  function(req, res, next) {
    if (req.user.role != 'employees') {
        console.log(req.user);
        return res.sendStatus(401);
    }
    next();
  },
  indexRouter,
  userRouter,
  employeeRouter);
app.use('/managers',
  jwtAuth,
  function(req, res, next) {
    if (req.user.role != 'managers') {
        console.log(req.user);
        return res.sendStatus(401);
    }
    next();
  },
  indexRouter,
  userRouter,
  employeeRouter,
  managerRouter);
app.use('/admins',
  jwtAuth,
  function(req, res, next) {
    if (req.user.role != 'admins') {
        console.log(req.user);
        return res.sendStatus(401);
    }
    next();
  },
  indexRouter,
  userRouter,
  employeeRouter,
  managerRouter,
  adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
