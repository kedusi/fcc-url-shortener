var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

require('dotenv').config();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://kedusi:<password>@fcc.kcis9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/

app.use(bodyParser.urlencoded({extended: "false"}));
app.use(bodyParser.json());

const schema = mongoose.Schema;
const urlSchema = new schema({
  url: {
    type: String,
    require: true
  },
  shortUrl: {
    type: Number,
    require: true
  }
});

let URL = mongoose.model("URL", urlSchema);

const url = new URL({
  url: "www.yakko.wakko.dot.com",
  shortUrl: 1
});

url.save(function(err) {
  if(err) return console.error(err);
});

module.exports = app;
