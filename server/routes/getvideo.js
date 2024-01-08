var express = require('express');
var router = express.Router();
var sqlHandler = require("../sqlHandler");

/* GET video info. */
router.get('/', function(req, res, next) {
    const name = req.query.name
    const splitted = name.split("-");
    const id = splitted[splitted.length - 1];

    sqlHandler.con.query("SELECT * FROM Anime WHERE id = '" + id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send("Anime not found");
            return;
        }
        res.status(200).send(result["0"]);
    });
});

module.exports = router;