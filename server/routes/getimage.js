var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');

/* GET image. */
router.get('/', function(req, res, next) {
    var name = req.query.name;
    res.sendFile(path.resolve(__dirname, './../public/p/' + name + '/banner.jpg'));

});

module.exports = router;