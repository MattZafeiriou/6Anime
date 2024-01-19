const express = require('express');
const router = express.Router();
const sqlHandler = require('../sqlHandler.js');

/* POST form. */
router.post('/', function(req, res, next) {
    const form = req.body;
    const name = encodeURI(form.name);
    const email = encodeURI(form.email);
    const subject = encodeURI(form.subject);
    const text = encodeURI(form.text);
    const ip = encodeURI(form.ip);

    sqlHandler.con.query(`INSERT INTO Form (name, email, subject, text, ip) VALUES (?, ?, ?, ?, ?)`, [name, email, subject, text, ip], function (err, result, fields) {
        if (err) throw err;
        console.log("1 record inserted");
        res.send("Success!");
    });
});

module.exports = router;