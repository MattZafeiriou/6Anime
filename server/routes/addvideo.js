var express = require('express');
var router = express.Router();
var sqlHandler = require('./../sqlHandler.js');

/* Add anime. */
router.post('/', function(req, res, next) {
    const body = req.body;
    const anify_id = +body.anify_id;
    const name = body.name;
    const folder_name = body.folder_name;
    const nicknames = JSON.stringify(decodeURI(body.nicknames).split(','));
    const description = body.description;
    const genre = JSON.stringify(body.genre);
    const episodes = +body.episodes;
    const duration = +body.duration;
    const premiered = body.premiered;
    const season = body.season;
    const rating = body.rating;
    const other_seasons_anify_ids = JSON.stringify(body.other_seasons_anify_ids);
    const type = body.type;
    const poster = body.poster;
    const banner = body.banner;
    const status = body.status;

    sqlHandler.con.query("INSERT INTO Anime(anify_id, name, folder_name, nicknames, description, genre, episodes, duration, premiered, season, rating, other_seasons_anify_ids, type, poster, banner, status, update_date, added_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE);", [anify_id, name, folder_name, nicknames, description, genre, episodes, duration, premiered, season, rating, other_seasons_anify_ids, type, poster, banner, status], function (err, result, fields) {
        if (err) throw err;
        res.send(result.insertId.toString());
    });

});

module.exports = router;