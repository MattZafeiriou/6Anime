var sqlHandler = require('./../sqlHandler');

function addepisode(anime_id, video_url, tracks, episode_number, intro, outro, res) {
    sqlHandler.con.query("INSERT INTO Episode(anime_id, video_url, tracks, episode_number, intro, outro) VALUES(?, ?, ?, ?, ?, ?);", [anime_id, video_url, tracks, episode_number, intro, outro], function (err, result, fields) {
        if (err) throw err;
        if (res != null)
            res.sendStatus(200);
    });
}

module.exports = addepisode;