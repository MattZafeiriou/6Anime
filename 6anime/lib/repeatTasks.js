const schedule = require('node-schedule')
const sqlHandler = require('./sqlHandler')
const backupHandler = require("./utils/backupHandler");

/*
    This was done with the help of https://crontab.guru
*/
let todayTag = 'Adventure';
function getAnimeInfo(anime_id) {
  return new Promise((resolve, reject) => {
    sqlHandler.con.query(`SELECT * FROM Anime WHERE id = ${anime_id}`, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
}

function getTodayViews() {
  return new Promise((resolve, reject) => {
    sqlHandler.con.query('SELECT * FROM Views WHERE today_views > 0', (err, results) => {
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
    const anime = await getAnimeInfo(anime_id);
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
  todayTag = mostUsedTag;
}

// This task repeats every day at 00:00
function repeatDaily () {
  schedule.scheduleJob('0 0 * * *', async () => {
    // Delete all daily views
    await getTodayMostUsedTag();
    sqlHandler.con.query('UPDATE Views SET today_views = 0 WHERE today_views > 0;', (err, result) => {
        if (err) throw err
        console.log('Daily views reset')
    })
  })
}

// This task repeats every Monday at 00:00
function repeatWeekly () {
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
function repeatMonthly () {
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

module.exports = { repeatDaily, repeatWeekly, repeatMonthly, repeatYearly, todayTag };