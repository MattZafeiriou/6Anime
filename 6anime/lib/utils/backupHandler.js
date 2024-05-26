const sqlHandler = require('../sqlHandler');
const fs = require('fs');

const backupPath = 'backups';

function backup() {
    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath);
    }
    var exec = require('child_process').exec;
    var datetime = new Date().toISOString().slice(0, 16).replace(/:/g, '_').replace(/\-/g, '_');
    var child = exec('mysqldump -u root -padmin AnimeDb > ' + backupPath + '/backup' + datetime + '.sql');
}

module.exports = { backup };