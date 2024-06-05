const schedule = require('node-schedule')
const sqlHandler = require('./sqlHandler')
const backupHandler = require("./utils/backupHandler");
const getAnimeInfo = require('./utils/getAnimeInfo.js');
const addvideo = require('./routes/addvideo.js');
const { META } = require("@consumet/extensions");
/*
    This was done with the help of https://crontab.guru
*/
let todayTag = 'Adventure';
function getAnimeInfo_(anime_id) {
  return new Promise((resolve, reject) => {
    sqlHandler.con.query(`SELECT * FROM Anime WHERE id = ${anime_id};`, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
}

function getAnimeInfoByApiId(anime_id) {
  return new Promise((resolve, reject) => {
    sqlHandler.con.query(`SELECT * FROM Anime WHERE api_id = ${anime_id};`, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
}

function getTodayViews() {
  return new Promise((resolve, reject) => {
    sqlHandler.con.query('SELECT * FROM Views WHERE today_views > 0;', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function getAnimeAiring() {
  return new Promise((resolve, reject) => {
    sqlHandler.con.query('SELECT * FROM Anime WHERE status = "CURRENTLY AIRING";', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

async function getTodayMostUsedTag() {

  const results = await getTodayViews();
  let tags = {};
  for (let i = 0; i < results.length; i++) {
    const anime_id = results[i].anime_id;
    const anime = await getAnimeInfo_(anime_id);
    const genre = JSON.parse(anime.genre);
    for (let j = 0; j < genre.length; j++) {
      if (tags[genre[j]] === undefined) {
        tags[genre[j]] = 1;
      } else {
        tags[genre[j]]++;
      }
    }
  }
  // get the most used tag
  let mostUsedTag = Object.keys(tags)[0];
  let mostUsedTagCount = tags[mostUsedTag];
  for (let tag in tags) {
    if (tags[tag] > mostUsedTagCount) {
      mostUsedTag = tag;
      mostUsedTagCount = tags[tag];
    }
  }
  if (mostUsedTagCount < 1)
    mostUsedTag = 'Adventure';
  todayTag = mostUsedTag;
}

// This task repeats every day at 00:00
function repeatDaily() {
  autoAddAnime();
  schedule.scheduleJob('0 0 * * *', async () => {
    autoAddAnime();
    // Delete all daily views
    await getTodayMostUsedTag();
    sqlHandler.con.query('UPDATE Views SET today_views = 0 WHERE today_views > 0;', (err, result) => {
      if (err) throw err
      console.log('Daily views reset')
    })
  })
}

// This task repeats every Monday at 00:00
function repeatWeekly() {
  schedule.scheduleJob('0 0 * * 1', async () => {
    // Create a backup of the database
    backupHandler.backup();
    console.log('Database backup created');


    // Delete all weekly views
    sqlHandler.con.query('UPDATE Views SET week_views = 0 WHERE week_views > 0;', (err, result) => {
      if (err) throw err
      console.log('Week views reset')
    })
  })
}

// This task repeats every 1st of month at 00:00
function repeatMonthly() {
  schedule.scheduleJob('0 0 1 * *', async () => {
    // Delete all monthly views
    sqlHandler.con.query('UPDATE Views SET month_views = 0 WHERE month_views > 0;', (err, result) => {
      if (err) throw err
      console.log('Month views reset')
    })
  })
}

// This task repeats every 1st of the year at 00:00
function repeatYearly() {
  schedule.scheduleJob('0 0 1 * *', async () => {
    // Delete all yearly views
    sqlHandler.con.query('UPDATE Views SET yearly_views = 0 WHERE yearly_views > 0;', (err, result) => {
      if (err) throw err
      console.log('Year views reset')
    })
  })
}

async function addAnimeToDatabase(anime) {
  return new Promise((resolve, reject) => {
    sqlHandler.con.query(`INSERT INTO Anime (api_id, title, episodes, status, premiered, update_date) VALUES (${anime.id}, "${anime.title}", ${anime.episodes}, "${anime.status}", "${anime.premiered}", CURRENT_DATE);`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

async function updateAnime() {
  schedule.scheduleJob('0 0/12 * * *', async () => {
    const results = await getAnimeAiring();
    for (let i = 0; i < results.length; i++) {
      const anime = results[i];
      let id = anime.api_id;
      const year = anime.premiered.split('-')[0];
      if (Number(anime.api_id) !== NaN)
        id = Number(anime.api_id);
      const data = await getAnimeInfo(id);
      const currentEpisode = data.currentEpisode;
      let status = data.status;
      if (status == "Completed")
        status = "FINISHED AIRING";
      else if (status == "Ongoing")
        status = "CURRENTLY AIRING";
      else
        status = "NOT YET AIRED";

      const totalEpisodes = anime.episodes;

      if (currentEpisode > totalEpisodes) {

        // update episodes and status
        sqlHandler.con.query(`UPDATE Anime SET episodes = ${currentEpisode}, status = "${status}", update_date = CURRENT_DATE WHERE id = ${anime.id};`, (err, result) => {
          if (err) throw err
        })
      }
    }
  }) // every 12 hours
}

async function autoAddAnime(page = 1) {
  const anilist = new META.Anilist();
  const today = new Date();
  const now = today.getTime().toString().slice(0, -3)
  //const week = 604800;
  const day = 86400;


  await anilist.fetchAiringSchedule(page, 20, Number(now), Number(now) + day, true).then(data => {
    if (data.hasNextPage) {
      autoAddAnime(page + 1);
    }

    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      const time = Number(results[i].airingAt) - now;
      setTimeout(async () => {
        const anime = results[i];
        const anime_id = anime.id;
        const animeInfo = await getAnimeInfoByApiId(anime_id);
        if (animeInfo === undefined) {
          addvideo.addAnime(anime_id)
        } else {
          const episode = anime.episode;
          sqlHandler.con.query(`UPDATE Anime SET episodes = ${episode}, update_date = CURRENT_DATE WHERE id = ${animeInfo.id};`, (err, result) => {
            if (err) throw err
          })
        }

      }, 1000 * (time + 60)); // add 60 seconds to the time
    }
  }).catch(e => {
    console.log(e);
  });
}

module.exports = { repeatDaily, repeatWeekly, repeatMonthly, repeatYearly, todayTag, updateAnime, autoAddAnime };