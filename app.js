var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filesRouter = require('./routes/files');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);

/* 
Error handling:
  1- create a middleware function for handling error 404
  2- create a main middleware function for handling all errors
  3- use both middlewares (1,2) after routers of your backend app
  4- Whenever any error happened Inside request handlers, use next(err)

*/


//error handler only for requests that has no handler (route)
app.use(function (req, res, next) {
  const err = new Error('This route is not defined yet');
  err.status = 404;
  next(err)
});


//main error handler middleware
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500);
    res.send({ message: err.message });
    //shorter syntax  res.status().send()
  }
})


module.exports = app;
