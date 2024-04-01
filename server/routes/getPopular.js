var express = require('express');
var router = express.Router();
var sqlHandler = require('../sqlHandler');

/* get popular anime. */
router.get('/', function(req, res, next) {
    const url = decodeURI(req.originalUrl);
    var oof = url.split("/");
    const queryString = oof[oof.length - 1];

    const urlParams = new URLSearchParams(queryString);
    let max = +urlParams.get("max");
    if (isNaN(max))
    {
        res.status(400).send("Invalid max parameter.");
        return;
    }
    if (!max)
        max = 10;
    if (max > 50)
        max = 50;
    if (max < 1)
        max = 1;

    sqlHandler.con.query("SELECT * FROM Views ORDER BY views_count DESC LIMIT ?", [max], function (err, result, fields) {
        if (err) throw err;
        var anime = [];
        for (var i = 0; i < result.length; i++)
            anime.push(result[i].anime_id);
        res.status(200).send(anime);
    });
});

module.exports = router;