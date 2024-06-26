const getAccountId = require('./getAccountId.js');
const sqlHandler = require('../../sqlHandler.js');

function post(req, res, next) {
    const body = req.body;
    const image = body.image;

    if (!image) {
        return res.status(400).send("Missing required fields");
    }

    const user_id = getAccountId.getAccountId(req, res);
    if (!user_id) {
        return res.status(400).send("Invalid user");
    }

    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const name = makecode(10);
    const filename = name + '.jpg';

    // resize image to 320x320
    const sharp = require('sharp');

    sharp(Buffer.from(base64Data, 'base64'))
        .resize(1584, 396)
        .toFile('./static/background_photos/' + filename, (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }

            sqlHandler.con.query(`SELECT background FROM Users WHERE id = ${user_id}`, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Internal Server Error");
                }
                if (result[0].background) {
                    if (result[0].background !== 'default') {
                        const fs = require('fs');
                        fs.unlink('./static/background_photos/' + result[0].background + ".jpg", (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                }

                sqlHandler.con.query(`UPDATE Users SET background = '${name}' WHERE id = ${user_id}`, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    res.status(200).send("Success");
                });
            });
        });
}

function makecode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

module.exports = post;