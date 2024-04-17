var express = require('express');
var router = express.Router();
var sqlHandler = require('./../sqlHandler');

/* Add anime. */
router.get('/', function(req, res, next) {
    const anime_id = +req.query.anime_id;
    const video_url = decodeURI(req.query.video_url);
    const tracks = req.query.tracks;
    const episode_number = +req.query.episode;
    const intro = req.query.intro;
    const outro = req.query.outro;

    sqlHandler.con.query("INSERT INTO Episode(anime_id, video_url, tracks, episode_number, intro, outro) VALUES(?, ?, ?, ?, ?, ?);", [anime_id, video_url, tracks, episode_number, intro, outro], function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
    });

});

module.exports = router;