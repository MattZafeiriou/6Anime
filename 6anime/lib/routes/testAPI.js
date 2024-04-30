var express = require('express');
var router = express.Router();
// const getAnimeInfo = require('./../utils/getAnimeInfo.js');
var sqlHandler = require('./../sqlHandler.js');

function oof ()
{
    for (let i = 1; i <= 881; i++)
    {
        console.log("Fixing: "+ i);
        sqlHandler.con.query("SELECT nicknames FROM Anime WHERE id = '" + i + "'", function (err, result, fields) {
            if (err) throw err;
            if (result.length == 0) {
                console.log("Anime not found.");
                return;
            }
            let result_ = result["0"];
            result_.nicknames = JSON.parse(result_.nicknames);
            if (result_.nicknames[result_.nicknames.length - 1] instanceof Array)
            {
                const oof = result_.nicknames[result_.nicknames.length - 1];
                result_.nicknames.pop();
                for (let i = 0; i < oof.length; i++)
                {
                    result_.nicknames.push(oof[i]);
                }
            }
            sqlHandler.con.query("UPDATE Anime SET nicknames = ? WHERE id = '" + i + "'", [JSON.stringify(result_.nicknames)], function (err, result, fields) {
                if (err) throw err;
            });
        });
    }
}

/* GET anime url. */
router.get('/', async function(req, res, next) {
    res.status(200).send("Hello World!");

    oof();
});

module.exports = router;