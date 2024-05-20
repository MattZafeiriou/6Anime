const sqlHandler = require('../../sqlHandler');

function post(req, res, next) {
    const body = req.body;
    if (!body.token) {
        return res.status(400).send("Missing required fields");
    }

    sqlHandler.con.query('SELECT * FROM Users WHERE verification_code = ?', [body.token], function (error, results, fields) {
        if (error) {
            return res.status(500).send("An error occurred");
        }

        if (results.length === 0) {
            return res.status(404).send("Invalid token");
        }

        sqlHandler.con.query('UPDATE Users SET verified = 1 WHERE verification_code = ?', [body.token], function (error, results, fields) {
            if (error) {
                return res.status(500).send("An error occurred");
            }

            return res.status(200).send("Account verified");
        });
    });
}
module.exports = post;