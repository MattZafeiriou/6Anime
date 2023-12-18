var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');

/* get view. */
router.get('/', function(req, res, next) {
    var name = req.query.name;
    const fileData = fs.readFileSync(path.resolve(__dirname, './../public/views.json'), "utf8").trim();
    const jsonData = JSON.parse(fileData);
    if (jsonData[name] === undefined) {
        res.send("0");
    } else {
        res.send(jsonData[name] + "");
    }
});

module.exports = router;