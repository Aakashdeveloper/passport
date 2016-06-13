var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport'),
    GoogleOAuth2Strategy = require('passport-google-auth').OAuth2Strategy;


passport.use(new GoogleOAuth2Strategy({
    clientId:'77633782496-213ses1ln1a21inadthpbr9e4ijrofp6.apps.googleusercontent.com ',
    clientSecret:'rj58QbzBSk3kvq_Q4n2hBxvw',
    callbackURL:'http://localhost:3000/auth/google/callback',
  },
  function(accessToken, refreshToken, profile, done) {

      done(err, user);
    
  }
));

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({secert:'anything'}));

passport.serializeUser(function(user, done){
  done(null, user)
});

passport.deserializeUser(function(user, done){
  done(null, user)
});

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handlerGoogleOAuth2Strategy
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
