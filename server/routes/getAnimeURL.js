var express = require('express');
var router = express.Router();
var sqlHandler = require("../sqlHandler");

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
            res.status(404).send("Episode not found");
            return;
        }
        res.status(200).send(result["0"]);
    });
});

module.exports = router;