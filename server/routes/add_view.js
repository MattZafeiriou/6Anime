var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');

/* Add view. */
router.get('/', function(req, res, next) {
    var name = req.query.name;
    const fileData = fs.readFileSync(path.resolve(__dirname, './../public/views.json'), "utf8").trim();
    const jsonData = JSON.parse(fileData);
    if (jsonData[name] === undefined) {
        jsonData[name] = 1;
    } else {
        jsonData[name] += 1;
    }
    fs.writeFileSync(path.resolve(__dirname, './../public/views.json'), JSON.stringify(jsonData));
    res.sendStatus(200);
});

module.exports = router;