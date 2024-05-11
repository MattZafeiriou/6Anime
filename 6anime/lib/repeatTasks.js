const schedule = require('node-schedule')
const sqlHandler = require('./sqlHandler')
const backupHandler = require("./utils/backupHandler");

/*
    This was done with the help of https://crontab.guru
*/

// This task repeats every day at 00:00
function repeatDaily () {
  schedule.scheduleJob('0 0 * * *', async () => {
    // Delete all daily views
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

module.exports = { repeatDaily, repeatWeekly, repeatMonthly, repeatYearly };