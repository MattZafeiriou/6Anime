const express = require('express');
const router = express.Router();

/* POST form. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("Success!");
});

module.exports = router;