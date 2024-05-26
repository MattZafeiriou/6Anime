const fs = require('fs');
const path = require('path');

/* GET featured. */
let featured = "";
function get(req, res) {
    if (featured === "") {
        fs.readFile(path.resolve('./public/featured.json'), 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            featured = data;
            res.send(data);
        });
    } else if (featured == null) {
        featured = ""; // reset variable
        res.status(500).send("Internal server error"); // send status
    } else {
        res.status(200).send(featured);
    }
};


module.exports = get;