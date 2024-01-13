const express = require('express');
const router = express.Router();
const sqlHandler = require('./../sqlHandler.js');

/* GET search listing. */
router.get('/', function(req, res, next) {
    const chars = decodeURI(req.query.chars || "");
    const genre = decodeURI(req.query.genre || "");
    const country = decodeURI(req.query.country || "");
    const season = decodeURI(req.query.season || "");
    const year = decodeURI(req.query.year || "");
    const type = decodeURI(req.query.type || "");
    const status = decodeURI(req.query.status || "");
    const language = decodeURI(req.query.language || "");
    let sort = decodeURI(req.query.sort || "");

    const page = decodeURI(+req.query.page || 1);
    const limit = decodeURI(+req.query.limit || 5);

    const tags = genre.split(",");
    const type_ = type.split(",");
    const year_ = year.split(",");
    let folders = [];
    // in the beginning, I knew what I was doing. Now only ChatGPT knows what this line does and I'm too afraid to ask.
    // select all the animes that contain in their name or nicknames the chars variable
    let query = "SELECT * FROM Anime WHERE (name LIKE ? OR EXISTS (SELECT 1 FROM JSON_TABLE(nicknames, '$[*]' COLUMNS(nickname VARCHAR(255) PATH '$')) AS nick WHERE LOWER(nick.nickname) LIKE LOWER(?)))";
    let params = ["%" + chars + "%", "%" + chars + "%"];

    if (genre !== "") {
        const placeholders = tags.map(tag => 'genre LIKE ?').join(' AND ');
        query += " AND (" + placeholders + ")";
    
        // Add each element separately to the params array
        tags.forEach(tag => params.push('%' + tag + '%'));
    }

    if (year !== "") {
        const placeholders = year_.map(yearr => 'EXTRACT(YEAR FROM premiered) LIKE ?').join(' OR ');
        query += " AND (" + placeholders + ")";
    
        // Add each element separately to the params array
        year_.forEach(yearr => params.push('%' + yearr + '%'));
    }

    if (type !== "") {
        const placeholders = type_.map(typee => 'type LIKE ?').join(' OR ');
        query += " AND (" + placeholders + ")";
    
        // Add each element separately to the params array
        type_.forEach(typee => params.push('%' + typee + '%'));
    }

    // sort
    if (sort !== "" && sort !== "Default") {
        if (sort === "Name A-Z") {
            query += " ORDER BY name ASC";
        } else if (sort === "Release Date") {
            query += " ORDER BY premiered ASC";
        } else if (sort === "Most Watched") {
        }
    }
    // limit
    //query += " LIMIT " + limit;

    sqlHandler.con.query(query, params, function (err, result, fields) {
        if (err) throw err;
        
        for (let i = 0; i < result.length; i++) {
            folders.push(result[i].folder_name + "-" + result[i].id);
        }
        res.status(200).send(folders);
    });
});

module.exports = router;
