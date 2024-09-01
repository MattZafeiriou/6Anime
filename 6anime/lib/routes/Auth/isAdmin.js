const sqlHandler = require('../../sqlHandler');
const getAccountId = require('./getAccountId.js');

function get(req, res, next) {
    const user_id = getAccountId.getAccountId(req, res);
    if (!user_id) {
        return res.status(400).send("Invalid user");
    }

    sqlHandler.con.query('SELECT role FROM Users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) {
            return res.status(500).send("An error occurred");
        }

        if (results.length === 0) {
            return res.status(404).send("User not found");
        }

        if (results[0].role !== 'admin') {
            return res.status(403).send("You do not have permission to access this page");
        } else {
            return res.status(200).send("You have access to this page");
        }
    });
}
module.exports = get;