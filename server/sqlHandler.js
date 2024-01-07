var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "animeDb"
});

var anime = null;

function connect()
{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    con.query("SELECT * FROM Anime", function (err, result, fields) {
        if (err) throw err;
        anime = result;
    });
}

function getAllAnime()
{
    return anime;
}

function test()
{
    con.query("INSERT INTO Episode (anime_id, video_url, tracks, episode_number) VALUES (1, 'wowww url', '[\"zamn\"]', 32)", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}

module.exports = { con, connect, test, getAllAnime };