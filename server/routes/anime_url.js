var express = require('express');
var router = express.Router();
var sqlHandler = require("../sqlHandler");

/* GET anime url. */
router.get('/', function(req, res, next) {
    const url = decodeURI(req.originalUrl);
    var oof = url.split("/");
    const queryString = oof[oof.length - 1];

    const urlParams = new URLSearchParams(queryString);

    sqlHandler.con.query("SELECT * FROM Episode WHERE anime_url = '" + urlParams.get("name") + "' AND episode_number = '" + urlParams.get("ep") + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send("Episode not found");
            return;
        }
        console.log(result["0"]);
        res.status(200).send(result["0"]);
    });
});

module.exports = router;