var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path');

/* POST form. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("Success!");
});

module.exports = router;