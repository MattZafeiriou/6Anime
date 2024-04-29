var express = require('express');
var router = express.Router();
var sqlHandler = require("../sqlHandler");

/* GET video info. */
router.get('/', function(req, res, next) {
    let id = req.query.id
    if (!id) {
        res.status(400).send("Missing param: id");
        return;
    }
    id = parseInt(id);

    if (isNaN(id)) {
        res.status(400).send("Invalid id.");
        return;
    }

    sqlHandler.con.query("SELECT * FROM Anime WHERE id = '" + id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send("Anime not found.");
            return;
        }
        let result_ = result["0"];
        result_.nicknames = JSON.parse(result_.nicknames);
        result_.studios = JSON.parse(result_.studios);
        result_.genre = JSON.parse(result_.genre);
        result_.other_season_folders = JSON.parse(result_.other_season_folders);
        result_.other_season_names = JSON.parse(result_.other_season_names);
        res.status(200).send(result_);
    });
});

module.exports = router;