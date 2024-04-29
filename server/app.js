const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const sqlHandler = require("./sqlHandler");

const testAPIRouter = require("./routes/testAPI");
const searchRouter = require("./routes/search");
const getVideoRouter = require("./routes/getvideo");
const animeURLRouter = require("./routes/getAnimeURL");
const sendFormRouter = require("./routes/sendForm");
const recommendationsRouter = require("./routes/recommendations");
const addViewRouter = require("./routes/addView");
const getViewRouter = require("./routes/getViews");
const getPopularRouter = require("./routes/getPopular");
const addVideoRouter = require("./routes/addvideo");
const addEpisodeRouter = require("./routes/addepisode");
const getIDRouter = require("./routes/get_id");
const getFeaturedRouter = require("./routes/getFeatured");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: /*["https://6anime.tv", "https://www.6anime.tv"],*/["http://localhost:3000", "http://localhost:9000"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './build')));

const pages = ["/watch", "/watch/*", "/search", "/about", "/donate", "/contact", "/404", "/trending", "/series", "/movies", "/trending"];

app.get(pages, (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.use("/api/testAPI", testAPIRouter);
app.use("/api/search", searchRouter);
app.use("/api/sendform", sendFormRouter);
app.use("/api/getvideo", getVideoRouter);
app.use("/api/getanimeurl", animeURLRouter);
app.use("/api/getviews", getViewRouter);
app.use("/api/getpopular", getPopularRouter);
app.use("/api/getid", getIDRouter);
app.use("/api/getfeatured", getFeaturedRouter);
app.use("/api/getrecommendations", recommendationsRouter);
app.use("/api/addview", addViewRouter);
app.use("/api/addvideo", addVideoRouter); 
app.use("/api/addepisode", addEpisodeRouter);
// Auth
app.use("/api/login", require("./routes/Auth/login"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect("/404");
  //next(createError(404));
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
