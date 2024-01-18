const mysql = require("mysql2");

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "animeDb"
});

var anime = null;

function connect()
{
    con.getConnection(function(err) {
        if (err) throw err;
        console.log("Connected to mySQL!");
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

module.exports = { con, connect, getAllAnime };