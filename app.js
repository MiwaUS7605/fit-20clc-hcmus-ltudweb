const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mysql = require('mysql2');
const passport = require('./components/auth/passport');


const app = express();
const route = require('./routes');

// view engine setup
const hbs = require('express-handlebars');
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'user-layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

const viewPath = path.join(__dirname, 'views');
app.set('views', viewPath);
app.set('view engine', 'hbs');

app.use(session({
  secret: 'very secret keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/students', studentRouter);
// app.use('/admin',adminRouter);
//<-Replace->
route(app);

// catch 404 and forward to error handler
app.use(function (req,
  res,
  next) {
  next(createError(404));
});

// error handler
app.use(function (err,
  req,
  res,
  next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;