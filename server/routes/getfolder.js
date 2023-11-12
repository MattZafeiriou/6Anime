var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

var most_recent;

function initializeMostRecent() {
    var obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, './../public/most_recent.json'), 'utf8'));
    most_recent = JSON.stringify(obj);
}

/* GET folders listing. */
router.get('/', function(req, res) {

    const url = decodeURI(req.originalUrl);
    var oof = url.split("/");
    const queryString = oof[oof.length - 1];

    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get("name")) {
        var name = urlParams.get("name").replace('"', "").replace('"', "");

        if (most_recent == null)
            initializeMostRecent();
        
        for (var i = 1; i <= JSON.parse(most_recent).max_numbers; i++) {
            var indexname = JSON.parse(most_recent)["" + i].name;
            if (indexname == name) {
                res.status(200).send(JSON.parse(most_recent)["" + i].folder_name);
                break;
			}
		}

    } else
        res.status(400).send("Request missing param: name");
});

module.exports = router;
