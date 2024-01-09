var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var sqlHandler = require("./sqlHandler");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require("./routes/search");
var folderRouter = require("./routes/getfolder");
var getVideoRouter = require("./routes/getvideo");
var animeURLRouter = require("./routes/anime_url");
var sendFormRouter = require("./routes/send_form");
var recommendationsRouter = require("./routes/recommendations");
var addViewRouter = require("./routes/add_view");
var getViewRouter = require("./routes/get_views");
var getPopularRouter = require("./routes/get_popular");
var addVideoRouter = require("./routes/addvideo");
var addEpisodeRouter = require("./routes/addepisode");
var getIDRouter = require("./routes/get_id");

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
app.use("/search/*", searchRouter);
app.use("/getfolder/*", folderRouter);
app.use("/get_video", getVideoRouter);
app.use("/anime_url", animeURLRouter);
app.use("/send_form", sendFormRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/add_view", addViewRouter);
app.use("/get_views", getViewRouter);
app.use("/get_popular", getPopularRouter);
app.use("/addvideo", addVideoRouter);
app.use("/addepisode", addEpisodeRouter);
app.use("/get_id", getIDRouter);

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

sqlHandler.connect();

module.exports = app;
