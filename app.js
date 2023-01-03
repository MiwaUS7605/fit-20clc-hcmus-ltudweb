 
 
                                                                                                                                                                                                      const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mysql = require('mysql2');
const passport = require('./components/auth/passport/index');

const app = express();
const route = require('./routes');

// view engine setup
const expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs.engine({
  extname: 'hbs',
  defaultLayout: 'user-layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

var hbs = expressHbs.create({});

hbs.handlebars.registerHelper('for', function (from, to, incr, url, block) {
  var accum = '';
  block.data.realUrl    = url;
  
  for (var i = from; i <= to; i += incr) {
    block.data.index = i;
    accum += block.fn(i);
  }
  return accum;
})

hbs.handlebars.registerHelper('each_fromto', function(arr, from, to, options) {
  if(!arr || arr.length == 0)
      return options.inverse(this);

  var result = [ ];
  for(var i = from; i <= to; ++i)
      result.push(options.fn(arr[i]));
  return result.join('');
});

hbs.handlebars.registerHelper('multiply', function(arg1, arg2, options) {
  return arg1*arg2;
});


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