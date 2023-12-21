var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');

/* get popular anime. */
router.get('/', function(req, res, next) {
    const url = decodeURI(req.originalUrl);
    var oof = url.split("/");
    const queryString = oof[oof.length - 1];

    const urlParams = new URLSearchParams(queryString);
    const max = urlParams.get("max");
    if (!max)
        max = 10;
    if (max > 50)
        max = 50;
    const fileData = fs.readFileSync(path.resolve(__dirname, './../public/views.json'), "utf8").trim();
    const jsonData = JSON.parse(fileData);

    // sort jsonData by value in descending order and return the keys (anime names)
    const sortedAnime = Object.keys(jsonData).sort(function(a,b){return jsonData[b]-jsonData[a]});
    res.status(200).send(sortedAnime.slice(0, max));
});

module.exports = router;