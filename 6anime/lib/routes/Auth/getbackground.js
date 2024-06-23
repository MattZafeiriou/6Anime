var sqlHandler = require('./../../sqlHandler.js');
const fs = require('fs');
const getAccountId = require('./getAccountId.js');
import path from 'path'

/* GET folders listing. */
function get(req, res) {
    let id = req.query.id;

    // check if user is logged in
    if (!id)
        id = getAccountId.getAccountId(req, res);

    if (!id) {
        res.status(400).send('Missing param: id');
        return;
    }

    if (isNaN(id)) {
        res.status(400).send('Invalid param: id');
        return;
    }

    const accountId = id;
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
