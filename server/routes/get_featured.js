const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

/* GET featured. */
let featured = "";
router.get('/', function(req, res, next) {
    if (featured === "")
    {
        fs.readFile(path.resolve(__dirname, './../public/featured.json'), 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            featured = data;
            res.send(data);
        });
    } else
    {
        res.send(featured);
    }
});


module.exports = router;