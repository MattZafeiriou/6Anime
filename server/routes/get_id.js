var express = require('express');
var router = express.Router();

var sqlHandler = require('./../sqlHandler.js');

/* GET folders listing. */
router.get('/', function(req, res) {
    const name = req.query.name;
    if (name) {
        sqlHandler.con.query("SELECT * FROM Anime WHERE folder_name='" + name + "';", function (err, result, fields) {
            if (err) throw err;
            res.status(200).send(result["0"]);
        });

    } else
        res.status(400).send("Request missing param: name");
});

module.exports = router;
