const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
    res.send("Login route works!");
    console.log(req.cookies);
});


module.exports = router;