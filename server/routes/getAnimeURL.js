var express = require('express');
var router = express.Router();
var sqlHandler = require("../sqlHandler");
const getAnimeEpisode = require('../utils/getAnimeEpisode');
const addEpisode = require('../utils/addEpisode');

/* GET anime url. */
router.get('/', function(req, res, next) {
    const anime_id = req.query.id;
    const ep = req.query.episode_number;

    if (!anime_id) {
        res.status(400).send("Missing param: id");
        return;
    }
    if (parseInt(anime_id) < 1 || isNaN(parseInt(anime_id))) {
        res.status(400).send("Invalid id.");
        return;
    }
    if (!ep) {
        res.status(400).send("Missing param: episode_number");
        return;
    }
    if (parseInt(ep) < 1 || isNaN(parseInt(ep))) {
        res.status(400).send("Invalid episode number.");
        return;
    }


    sqlHandler.con.query("SELECT video_url, tracks FROM Episode WHERE anime_id = '" + anime_id + "' AND episode_number = '" + ep + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            sqlHandler.con.query("SELECT api_episode FROM Anime WHERE id = ?", [anime_id], async function (err, result, fields) {
                if (err) throw err;
                if (result.length == 0) {
                    res.status(404).send("Anime not found");
                    return;
                }
                const api_episode = result["0"].api_episode + "-episode-" + ep;
                const src = await getAnimeEpisode(api_episode);
                const data = {"video_url": src, "tracks": []};
                res.status(200).send(JSON.stringify(data));
                addEpisode(anime_id, src, "[]", ep, "[]", "[]", null);
            });
            return;
        }
        res.status(200).send(result["0"]);
    });
});

module.exports = router;