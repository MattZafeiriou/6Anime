var express = require('express');
var router = express.Router();
var sqlHandler = require('../sqlHandler');

/* Add view. */
router.get('/', function(req, res, next) {
    let id = req.query.id;
    if (!id) {
        res.status(400).send("Missing param: id");
        return;
    }

    id = parseInt(id);
    if (isNaN(id) || id < 1) {
        res.status(400).send("Invalid id.");
        return;
    }

    sqlHandler.con.query("SELECT * FROM Views WHERE id = ?", [id], function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            sqlHandler.con.query("SELECT * FROM Anime WHERE id = ?", [id], function (err, result, fields) {
                if (err) throw err;
                if (result.length === 0) {
                    res.status(404).send("Anime not found.");
                    return;
                }
                sqlHandler.con.query("INSERT INTO Views (id, anime_id, views_count) VALUES (?, ?, ?)", [id , id, 1], function (err, result, fields) {
                    if (err) throw err;
                    res.sendStatus(200);
                });
            });
        } else {
            sqlHandler.con.query("UPDATE Views SET views_count = ?, today_views = ?, week_views = ?, month_views = ?, year_views = ? WHERE id = ?", [result[0].views_count + 1, result[0].today_views + 1, result[0].week_views + 1, result[0].month_views + 1, result[0].year_views + 1, id], function (err, result, fields) {
                if (err) throw err;
                res.sendStatus(200);
            });
        }
    });
});

module.exports = router;