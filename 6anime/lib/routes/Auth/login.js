const sqlHandler = require('../../sqlHandler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailValidator = require("email-validator");
import { setCookie } from 'cookies-next';

function post(req, res, next) {
    const body = req.body;
    const email = body.email.toLowerCase();
    const password = body.password;
    if (!email || !password) {
        return res.status(400).send("Missing required fields");
    }

    if (EmailValidator.validate(email) === false) {
        return res.status(400).send("Invalid email");
    }

    // Get user from database
    sqlHandler.con.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).send("Account with this email does not exist.");
        }
        const user = result[0];

        // Check if password is correct
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) throw err;
            if (!same) {
                return res.status(401).send("Incorrect password");
            }

            // Password is correct
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            setCookie("token", token, { req, res, maxAge: 60 * 60 * 24 * 7, httpOnly: false, secure: true, domain: "*.6anime.tv" })
            res.status(200).send("Login successful");
        });
    });


    //res.status(200).send("Login route works!");
    //console.log(req.cookies);
}
module.exports = post;