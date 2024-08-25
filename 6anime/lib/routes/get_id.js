var sqlHandler = require('./../sqlHandler.js');

/* GET folders listing. */
function get(req, res) {
    const name = decodeURI(req.query.name);

    if (name) {
        sqlHandler.con.query("SELECT * FROM Anime WHERE folder_name= ? ;", [name], function (err, result, fields) {
            if (err) throw err;
            if (result.length === 0) {
                res.status(404).send("Anime not found.");
                return;
            }
            res.status(200).send(result["0"]);
        });

    } else
        res.status(400).send("Request missing param: name");
};

module.exports = get;
