const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const sqlHandler = require("./sqlHandler");

const searchRouter = require("./routes/search");
const folderRouter = require("./routes/getfolder");
const getVideoRouter = require("./routes/getvideo");
const animeURLRouter = require("./routes/anime_url");
const sendFormRouter = require("./routes/send_form");
const recommendationsRouter = require("./routes/recommendations");
const addViewRouter = require("./routes/add_view");
const getViewRouter = require("./routes/get_views");
const getPopularRouter = require("./routes/get_popular");
const addVideoRouter = require("./routes/addvideo");
const addEpisodeRouter = require("./routes/addepisode");
const getIDRouter = require("./routes/get_id");
const getFeaturedRouter = require("./routes/get_featured");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/search", searchRouter);
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
app.use("/get_featured", getFeaturedRouter);

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
