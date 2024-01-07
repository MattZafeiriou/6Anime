var express = require('express');
var router = express.Router();
var sqlHandler = require("../sqlHandler");

/* GET video info. */
router.get('/', function(req, res, next) {
    var name = req.query.name;

    sqlHandler.con.query("SELECT * FROM Anime WHERE folder_name = '" + name + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send("Anime not found");
            return;
        }
        console.log(result["0"]);
        res.status(200).send(result["0"]);
    });
});

module.exports = router;