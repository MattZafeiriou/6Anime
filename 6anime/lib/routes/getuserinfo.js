const sqlHandler = require('../sqlHandler');
const getAccountId = require('./Auth/getAccountId');

/* get popular anime. */
function get(req, res) {
    let id = req.query.id;

    // check if user is logged in
    if (!id)
        id = getAccountId.getAccountId(req, res);

    if (!id) {
        res.status(400).send('Missing param: id');
        return;
    }

    if (isNaN(id)) {
        res.status(400).send('Invalid param: id');
        return;
    }

    let sql = `SELECT id, username, avatar, background, role FROM Users WHERE id = ${id}`;
    sqlHandler.con.query(sql, function (err, result) {
        if (err) {
            res.status(500).send('Internal server error: ' + err);
            return;
        }

        if (result.length === 0) {
            res.status(404).send('Not found');
            return;
        }

        res.json(result[0]);
    });
};

module.exports = get;