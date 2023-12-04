var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var searchRouter = require("./routes/search");
var folderRouter = require("./routes/getfolder");
var playerRouter = require("./routes/player");
var getVideoRouter = require("./routes/getvideo");
var getImageRouter = require("./routes/getimage");
var animeURLRouter = require("./routes/anime_url");
var sendFormRouter = require("./routes/send_form");
var recommendationsRouter = require("./routes/recommendations");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/search/*", searchRouter);
app.use("/getfolder/*", folderRouter);
app.use("/p/*", playerRouter);
app.use("/get_video", getVideoRouter);
app.use("/get_image", getImageRouter);
app.use("/anime_url", animeURLRouter);
app.use("/send_form", sendFormRouter);
app.use("/recommendations", recommendationsRouter);

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
