const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join('./', 'public', 'build')));

// uncomment after placing your favicon in /assets
//app.use(favicon(path.join('./', 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'))); // This allows files in the ./public folder to be accessed from the root directory on the server
app.use(express.static(path.join('./', 'public', 'assets'))); // This allows files in the ./public/asset folder to be accessed from the root directory on the server
app.use(express.static(path.join('./', 'public', 'uploads'))); // This allows files in the ./public/uploads folder to be accessed from the root directory on the server

//connect to db
require('./models').connect(config.dbUri);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

router(app);

app.get('/*', function(req, res, next) {
    res.render('layout', { title: "MERN Application" });
});


app.listen();
module.exports = app;

