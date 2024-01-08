var express = require('express');
var router = express.Router();
var sqlHandler = require("../sqlHandler");

/* GET anime url. */
router.get('/', function(req, res, next) {
    const url = decodeURI(req.originalUrl);
    var oof = url.split("/");
    const queryString = oof[oof.length - 1];

    const urlParams = new URLSearchParams(queryString);

    const name = urlParams.get("name");
    const splitted = name.split("-");
    const anime_id = splitted[splitted.length - 1];
    const ep = urlParams.get("ep");
    sqlHandler.con.query("SELECT * FROM Episode WHERE anime_id = '" + anime_id + "' AND episode_number = '" + ep + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send("Episode not found");
            return;
        }
        res.status(200).send(result["0"]);
    });
});

module.exports = router;