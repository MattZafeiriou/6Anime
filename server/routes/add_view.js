var express = require('express');
var router = express.Router();
var sqlHandler = require('./../sqlHandler');

/* Add view. */
router.get('/', function(req, res, next) {
    var name = req.query.name;
    const splitted = name.split('-');
    const id = splitted[splitted.length - 1];

    sqlHandler.con.query("SELECT * FROM Views WHERE id = ?", [id], function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            sqlHandler.con.query("SELECT * FROM Anime WHERE id = ?", [id], function (err, result, fields) {
                if (err) throw err;
                if (result.length === 0) {
                    res.sendStatus(400);
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