const express = require('express');
const router = express.Router();
const sqlHandler = require('../sqlHandler.js');

/* POST form. */
router.post('/', function(req, res, next) {
    const form = req.body;
    const name = form.name;
    const email = form.email;
    const subject = form.subject;
    const text = form.text;
    const ip = form.ip;
    if (!name || !email || !subject || !text || !ip) {
        res.status(400).send("Missing param.");
        return;
    }

    sqlHandler.con.query(`INSERT INTO Form (name, email, subject, text, ip) VALUES (?, ?, ?, ?, ?)`, [name, email, subject, text, ip], function (err, result, fields) {
        if (err) throw err;
        console.log("1 record inserted: " + name + " " + email + " " + subject + " " + text + " " + ip);
        res.sendStatus(200);
    });
});

module.exports = router;