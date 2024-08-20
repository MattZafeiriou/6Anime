//var express = require('express');
//const getAnimeInfo = require('./../utils/getAnimeInfo.js');
var sqlHandler = require('./../sqlHandler.js');

function oof() {
    for (let i = 1; i <= 3049; i++) {
        sqlHandler.con.query("SELECT * FROM Anime WHERE id = " + i, function (err, result, fields) {
            if (err) throw err;

            //console.log(result[0].name === undefined);
            const name = result[0].name;

            let folder_name = result[0].folder_name;
            let t = false;

            if (folder_name.includes("/")) {
                t = true;
                folder_name = folder_name.replaceAll("/", "-");
            }

            if (t) {
                sqlHandler.con.query("UPDATE Anime SET folder_name = \"" + folder_name + "\" WHERE id = " + i, function (err, result, fields) {
                    if (err) throw err;
                });

                console.log("Updated " + name + " to " + folder_name);
            }
        });

    }
}

/* GET anime url. */
function get(req, res, next) {
    res.status(200).send("Hello World!");

//    oof();
}

module.exports = get;