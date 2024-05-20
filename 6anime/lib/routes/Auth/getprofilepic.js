var sqlHandler = require('./../../sqlHandler.js');
const fs = require('fs');
import path from 'path'

/* GET folders listing. */
function get(req, res) {
    const filePath = path.resolve('./profile_photos/default.jpg')
    const imageBuffer = fs.readFileSync(filePath)

    res.setHeader('Content-Type', 'image/jpg')
    res.send(imageBuffer);
};

module.exports = get;
