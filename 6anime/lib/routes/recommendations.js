const fs = require('fs');
const path = require('path');

let rec = "";
/* GET recommendations. */
function get(req, res) {
    if (rec == null || rec == "") {
        console.log(__dirname)
        rec = fs.readFileSync(path.resolve('./public/recommendations.json'), 'utf8');
    }

    if (rec == null || rec == "") {
        res.status(500).send("Internal server error");
        return;
    }

    res.status(200).send(rec);
};

module.exports = get;