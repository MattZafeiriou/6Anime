var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');

/* GET video info. */
router.get('/', function(req, res, next) {
    var name = req.query.name;
    fs.readFile(path.resolve(__dirname, './../public/p/' + name + '/info.json'), 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});

module.exports = router;