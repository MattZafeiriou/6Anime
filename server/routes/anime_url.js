var express = require('express');
const streamtapeutils = require('../public/javascripts/streamtapeUtils.js');
const fs = require('fs');
var router = express.Router();
const path = require('path');

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

/* GET anime url. */
router.get('/', function(req, res, next) {
    const url = decodeURI(req.originalUrl);
    var oof = url.split("/");
    const queryString = oof[oof.length - 1];

    const urlParams = new URLSearchParams(queryString);

    const folder = urlParams.get("name") + "/ep" + urlParams.get("ep");

    // Obtain file id
    var file_id = "";
    fs.readFile(path.resolve(__dirname + "/../public/p/" + folder + "/anime_url.txt"), 'utf8', (err, data) => {
        if (err) {
            console.log("Could not find anime_url.txt for folder: " + folder + "\n" + err);
            res.sendFile(__dirname + "/public/404.html")
            return;
        }
        file_id = data

        if (isValidHttpUrl(file_id)) {
            res.status(200).send(file_id);
            return;
		} else {
            // vars
            var login = "ef0834371263a674dd24";
            var key = "Zr6aVGvYPXSq8RQ";

            // get download link
            streamtapeutils.get_download_ticket(file_id, login, key, res)
        }

    });
});

module.exports = router;