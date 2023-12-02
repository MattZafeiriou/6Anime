var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

var names = null;

function getNames() {
    if (names == null) {
        const rawdata = fs.readFileSync(path.resolve(__dirname, './../public/most_recent.json'));

        let data = JSON.parse(rawdata);

        names = [];
        let max_numbers = Object.keys(data).length;
        for (var i = 1; i <= max_numbers; i++)
        {
            var name = data["" + i].name;
            names.push(name);
        }
    }
    return names;
}

function search(string) {

    const queryString = string.split("/search/")[1];
    const urlParams = new URLSearchParams(queryString);

    const finalArray = [];

    const max_items = 5;
    var item = 0;

    var chars = "";

    if (urlParams.get("chars"))
        chars = urlParams.get("chars");

    for (const folder of getNames())
    {
        if (folder.toUpperCase().indexOf(chars.toUpperCase()) > -1) {
            finalArray.push(folder);
            item++;
            if (item == max_items)
                break;
        }
    }
    return finalArray;
}


/* GET search listing. */
router.get('/', function(req, res, next) {
    const suggestions = search(req.originalUrl);
    res.status(200).send(suggestions);
});

module.exports = router;
