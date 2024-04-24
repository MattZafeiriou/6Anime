var express = require('express');
var router = express.Router();
var sqlHandler = require('./../sqlHandler.js');
const getAnimeInfo = require('./../utils/getAnimeInfo.js');

/* Add anime. */
router.post('/', function(req, res, next) {
    const body = req.body;
    const id = body.id;

    sqlHandler.con.query("SELECT * FROM Anime WHERE api_id = ?;", [id], async function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0)
        {
            res.status(409).send("Anime already exists");
        } else
        {
            const data = await getAnimeInfo(id);
            if (data == null)
            {
                res.status(404).send("Anime not found");
                return;
            }

            let name = data.title.romaji;
            if (data.title.english != null)
                name = data.title.english;
            if (data.title.userPreferred != null)
                name = data.title.userPreferred;
            let status = data.status;
            if (status == "Completed")
                status = "FINISHED AIRING";
            else if (status == "Ongoing")
                status = "CURRENTLY AIRING";
            else
                status = "NOT YET AIRED";

            let folder_name = name.replaceAll("-", "").replaceAll(" ", "_").toLowerCase();
            if (folder_name.length > 50)
                folder_name = folder_name.substring(0, 50);
            let nicknames = [];
            if (data.title.english != null)
                nicknames.push(data.title.english);
            if (data.title.romaji != null)
                nicknames.push(data.title.romaji);
            if (data.title.native != null)
                nicknames.push(data.title.native);
            if (data.synonyms != null)
                nicknames.push(data.synonyms);
            nicknames = JSON.stringify(nicknames);

            const description = data.description;
            const studios = JSON.stringify(data.studios);
            const genre = JSON.stringify(data.genres);
            const episodes = data.totalEpisodes;
            const duration = data.duration;
            // follow format YYYY-MM-DD
            const premiered = data.startDate.year + "-" + data.startDate.month + "-" + data.startDate.day;
            let other_season_folders = [];
            let other_season_names = [];
            const relations = data.relations;

            for (let i = 0; i < relations.length; i++)
            {
                let name_ = relations[i].title.romaji;
                if (relations[i].title.english != null)
                    name_ = relations[i].title.english;
                if (relations[i].title.userPreferred != null)
                    name_ = relations[i].title.userPreferred;
                let folder_name_ = name_.replaceAll("-", "").replaceAll(" ", "_").toLowerCase();
                other_season_folders.push(folder_name_);
                other_season_names.push(name_);
            }
            other_season_folders = JSON.stringify(other_season_folders);
            other_season_names = JSON.stringify(other_season_names);
            let type = data.type;
            if (type == "TV")
                type = "TV Series";
            else if (type == "MOVIE")
                type = "Movie";
            else if (type == "SPECIAL")
                type = "Special";
            else if (type == "OVA")
                type = "OVA";
            else if (type == "ONA")
                type = "ONA";
            else if (type == "MUSIC")
                type = "Music";

            let season = "";
            if (data.season != null)
                season = data.season;
            
            const rating = +data.rating / 10;
            const poster = data.image;
            const banner = data.cover;
            let language = data.subOrDub;
            language = language.charAt(0).toUpperCase() + language.slice(1);
            const country = data.countryOfOrigin;
            const api_id = +data.id;
            if (data.episodes.length == 0)
            {
                res.status(404).send("Anime not found");
                return;
            }
            const api_episode = data.episodes[0].id.replace("-episode-1", "");

            sqlHandler.con.query("INSERT INTO Anime(name, status, folder_name, nicknames, description, studios, genre, episodes, duration, premiered, other_season_folders, other_season_names, type, season, rating, poster, banner, language, country, api_id, api_episode, update_date, added_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE);", [name, status, folder_name, nicknames, description, studios, genre, episodes, duration, premiered, other_season_folders, other_season_names, type, season, rating, poster, banner, language, country, api_id, api_episode], function (err, result, fields) {
                if (err) throw err;
                res.status(200).send("Anime added successfully");

                // Set views to 0
                sqlHandler.con.query("INSERT INTO Views(id, anime_id, views_count) VALUES (?, ?, ?);", [result.insertId, result.insertId, 0], function (err, result, fields) {
                    if (err) throw err;
                });
            });
        }
    });
    // const name = body.name;
    // const status = body.status;
    // const folder_name = body.folder_name;
    // const nicknames = body.nicknames;
    // const anime_season = body.anime_season;
    // const description = body.description;
    // const studios = body.studios;
    // const genre = body.genre;
    // const episodes = +body.episodes;
    // const duration = +body.duration;
    // const premiered = body.premiered;
    // const other_season_folders = body.other_season_folders;
    // const other_season_names = body.other_season_names;
    // const type = body.type;
    // const season = body.season;
    // const rating = body.rating;
    // const poster = body.poster;
    // const banner = body.banner;
    // const language = body.language;

    // sqlHandler.con.query("INSERT INTO Anime(name, status, folder_name, nicknames, anime_season, description, studios, genre, episodes, duration, premiered, other_season_folders, other_season_names, type, season, rating, poster, banner, language, update_date, added_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE);", [name, status, folder_name, nicknames, anime_season, description, studios, genre, episodes, duration, premiered, other_season_folders, other_season_names, type, season, rating, poster, banner, language], function (err, result, fields) {
    //     if (err) throw err;
    //     res.send(result.insertId.toString());
    // });

});

module.exports = router;