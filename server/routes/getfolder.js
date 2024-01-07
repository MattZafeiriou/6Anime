var express = require('express');
var router = express.Router();

var sqlHandler = require('./../sqlHandler.js');

/* GET folders listing. */
router.get('/', function(req, res) {
    const url = decodeURI(req.originalUrl);
    var oof = url.split("/");
    const queryString = oof[oof.length - 1];

    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get("name")) {
        var name = urlParams.get("name").replace('"', "").replace('"', "");

        sqlHandler.con.query("SELECT folder_name FROM Anime WHERE name='" + name + "';", function (err, result, fields) {
            if (err) throw err;
            res.status(200).send(result["0"]["folder_name"]);
        });

    } else
        res.status(400).send("Request missing param: name");
});

module.exports = router;
