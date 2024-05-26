var express = require('express');
var router = express.Router();
const getAnimeInfo = require('./../utils/getAnimeInfo.js');
var sqlHandler = require('./../sqlHandler.js');

function oof() {
    const max = 3049;
    for (let i = 1; i <= max; i++) {
        sqlHandler.con.query("SELECT * FROM Anime WHERE id = '" + i + "'", async function (err, result, fields) {
            //console.log(i)
            if (err) throw err;
            // if (result.length == 0) {
            //     console.log("Anime not found.");
            //     return;
            // }
            //console.log(result["0"].status);
            //return;
            if (result["0"].status !== "CURRENTLY AIRING") {
                return;
            }
            console.log("Fixing: " + i);
            let result_ = result["0"];
            const episodes = JSON.parse(result_.episodes);
            const info = await getAnimeInfo(Number(result_.api_id));
            if (episodes > info.currentEpisode) {
                console.log("Updating: " + i);
                sqlHandler.con.query("UPDATE Anime SET episodes = ? WHERE id = '" + i + "'", [info.currentEpisode], function (err, result, fields) {
                    if (err) throw err;
                });
            }
            //console.log(info.currentEpisode, episodes);
            // sqlHandler.con.query("UPDATE Anime SET nicknames = ? WHERE id = '" + i + "'", [JSON.stringify(result_.nicknames)], function (err, result, fields) {
            //     if (err) throw err;
            // });
        });
    }
}

/* GET anime url. */
function get(req, res, next) {
    res.status(200).send("Hello World!");

    oof();
}

module.exports = get;