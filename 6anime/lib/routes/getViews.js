var sqlHandler = require('../sqlHandler');

/* get view. */
function get(req, res) {
    let id = req.query.id

    if (!id) {
        res.status(400).send("Missing param: id");
        return;
    }
    id = parseInt(id);
    if (isNaN(id) || id < 1) {
        res.status(400).send("Invalid id.");
        return;
    }

    sqlHandler.con.query("SELECT * FROM Views WHERE id = ?", [id], function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            res.send("0");
        } else {
            res.send(result[0].views_count + "");
        }
    });
};

module.exports = get;