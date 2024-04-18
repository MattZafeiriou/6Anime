var express = require('express');
var router = express.Router();
var sqlHandler = require('./../sqlHandler.js');

/* Add anime. */
router.post('/', function(req, res, next) {
    const body = req.body;
    const name = body.name;
    const status = body.status;
    const folder_name = body.folder_name;
    const nicknames = body.nicknames;
    const anime_season = body.anime_season;
    const description = body.description;
    const studios = body.studios;
    const genre = body.genre;
    const episodes = +body.episodes;
    const duration = +body.duration;
    const premiered = body.premiered;
    const other_season_folders = body.other_season_folders;
    const other_season_names = body.other_season_names;
    const type = body.type;
    const season = body.season;
    const rating = body.rating;
    const poster = body.poster;
    const banner = body.banner;
    const language = body.language;

    sqlHandler.con.query("INSERT INTO Anime(name, status, folder_name, nicknames, anime_season, description, studios, genre, episodes, duration, premiered, other_season_folders, other_season_names, type, season, rating, poster, banner, language, update_date, added_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE);", [name, status, folder_name, nicknames, anime_season, description, studios, genre, episodes, duration, premiered, other_season_folders, other_season_names, type, season, rating, poster, banner, language], function (err, result, fields) {
        if (err) throw err;
        res.send(result.insertId.toString());
    });

});

module.exports = router;