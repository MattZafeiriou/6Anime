var sqlHandler = require('../../sqlHandler.js');

/* GET folders listing. */
function get(req, res) {

    sqlHandler.con.query("SELECT * FROM Statistics WHERE type=\"Toasts\";", function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            res.status(404).send("Toast not found.");
            return;
        }
        const value = +result[0].value;
        sqlHandler.con.query("UPDATE Statistics SET value = ? WHERE type = \"Toasts\";", [value + 1], function (err, result, fields) {
            if (err) throw err;
        });
    });
    res.status(200).send("OK");
};

module.exports = get;
