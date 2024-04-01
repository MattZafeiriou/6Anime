var express = require('express');
var router = express.Router();

/* GET anime url. */
router.get('/', function(req, res, next) {
    res.status(200).send("API is working properly");
});

module.exports = router;