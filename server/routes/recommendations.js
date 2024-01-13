const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

/* GET recommendations. */
router.get('/', function(req, res, next) {
    fs.readFile(path.resolve(__dirname, './../public/recommendations.json'), 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});

module.exports = router;