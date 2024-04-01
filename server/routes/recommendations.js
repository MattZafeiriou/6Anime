const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

let rec = "";
/* GET recommendations. */
router.get('/', function(req, res, next) {
    if (rec == null || rec == "") {
        rec = fs.readFileSync(path.resolve(__dirname, './../public/recommendations.json'), 'utf8');
    }

    if (rec == null || rec == "") {
        res.status(500).send("Internal server error");
        return;
    }

    res.status(200).send(rec);
});

module.exports = router;