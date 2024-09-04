var sqlHandler = require('../sqlHandler');

/* get popular anime. */
function get(req, res) {
    let max = +req.query.max;
    if (isNaN(max)) {
        res.status(400).send("Invalid max parameter.");
        return;
    }
    if (!max)
        max = 10;
    if (max > 50)
        max = 50;
    if (max < 1)
        max = 1;

    sqlHandler.con.query("SELECT * FROM Views ORDER BY views_count DESC LIMIT ?", [max], function (err, result, fields) {
        if (err) throw err;
        var anime = [];
        for (var i = 0; i < result.length; i++)
            anime.push(result[i].anime_id);
        res.status(200).send(anime);
    });
};

module.exports = get;