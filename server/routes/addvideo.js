var express = require('express');
var router = express.Router();
var sqlHandler = require('./../sqlHandler.js');

/* Add anime. */
router.get('/', function(req, res, next) {
    const name = req.query.name;
    const folder = req.query.folder;
    const nicknames = req.query.nicknames;
    const season = +req.query.season;
    const description = req.query.description;
    const studios = req.query.studios;
    const genre = req.query.genre;
    const episodes = +req.query.episodes;
    const duration = +req.query.duration;
    const premiered = req.query.premiered;
    const other_seasons_folders = req.query.other_seasons_folders;
    const other_seasons_names = req.query.other_seasons_names;
    const anime_type = req.query.anime_type;
    const poster = req.query.poster;

    sqlHandler.con.query("INSERT INTO Anime(name, folder_name, nicknames, season, description, studios, genre, episodes, duration, premiered, other_seasons_folders, other_seasons_names, type, poster, update_date, added_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE);", [name, folder, nicknames, season, description, studios, genre, episodes, duration, premiered, other_seasons_folders, other_seasons_names, anime_type, poster], function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
    });

});

module.exports = router;