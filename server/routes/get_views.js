var express = require('express');
var router = express.Router();
var sqlHandler = require('./../sqlHandler');

/* get view. */
router.get('/', function(req, res, next) {
    const name = req.query.name;
    const splitted = name.split('-');
    const id = splitted[splitted.length - 1];

    sqlHandler.con.query("SELECT * FROM Views WHERE id = ?", [id], function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            res.send("0");
        } else {
            res.send(result[0].views_count + "");
        }
    });
});

module.exports = router;