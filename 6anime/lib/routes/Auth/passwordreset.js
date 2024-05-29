const EmailService = require("../../../lib/EmailService");

async function post(req, res, next) {
    const body = req.body;
    if (!body.email) {
        return res.status(400).send("Missing required fields");
    }

    // Generate a random token
    const token = makecode(20);

    // Send the email
    EmailService.sendPasswordResetEmail(body.email, token);
    
    res.status(200);
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