var sqlHandler = require('./../../sqlHandler.js');
const fs = require('fs');
const getAccountId = require('./getAccountId.js');
import path from 'path'

/* GET folders listing. */
function get(req, res) {
    const accountId = getAccountId.getAccountId(req, res);
    if (!accountId) return res.status(401).send('Unauthorized');
    sqlHandler.con.query(`SELECT background FROM Users WHERE id = ${accountId}`, function (err, result) {
        if (err) return res.status(500).send('Internal Server Error');
        if (result.length === 0) return res.status(404).send('Not Found');

        const filePath = path.resolve('./static/background_photos/' + result[0].background + '.jpg')
        const imageBuffer = fs.readFileSync(filePath)
    
        res.setHeader('Content-Type', 'image/jpg')
        res.send(imageBuffer);
    });
};

module.exports = get;
