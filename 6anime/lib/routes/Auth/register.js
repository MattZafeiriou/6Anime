const EmailValidator = require("email-validator");
const sqlHandler = require("../../../lib/sqlHandler");
const bcrypt = require("bcrypt");
const EmailService = require("../../../lib/EmailService");
const jwt = require("jsonwebtoken");
import { setCookie } from 'cookies-next';

function post(req, res, next) {
    const body = req.body;
    const username = body.username.toLowerCase();
    const email = body.email.toLowerCase();
    const password = body.password;

    if (!username || !email || !password) {
        return res.status(400).send("Missing required fields");
    }

    // Check if password is valid
    if (password.length < 8) {
        return res.status(400).send("Password must be at least 8 characters long");
    }

    if (password.length > 100) {
        return res.status(400).send("Password must be at most 100 characters long");
    }

    if (!/[A-Z]/.test(password)) {
        return res.status(400).send("Password must contain at least one uppercase letter");
    }

    if (!/[!@#$%^&*]/.test(password)) {
        return res.status(400).send("Password must contain at least one special character");
    }

    // Check if email is valid
    if (!EmailValidator.validate(email)) {
        return res.status(400).send("Invalid email");
    }
    sqlHandler.con.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(409).send("Account with this email already exists.");
        }
        // Email is valid and not in use

        // Check if username is valid
        if (username.length < 3) {
            return res.status(400).send("Username must be at least 3 characters long");
        }

        if (username.length > 20) {
            return res.status(400).send("Username must be at most 20 characters long");
        }

        if (!/^[a-zA-Z0-9_]*$/.test(username)) {
            return res.status(400).send("Username must only contain letters, numbers, and underscores");
        }

        sqlHandler.con.query(`SELECT * FROM Users WHERE username = '${username}'`, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                return res.status(409).send("Account with this username already exists.");
            }
            // Username is valid and not in use

            // Hash the password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) throw err;

                const verification_code = makecode(64);
                // Insert the user into the database
                sqlHandler.con.query(`INSERT INTO Users (username, email, password, role, avatar, background, created_at, verified, verification_code) VALUES ('${username}', '${email}', '${hash}', 'user', 'default', 'default', CURRENT_DATE, 0, '${verification_code}')`, (err, result) => {
                    if (err) throw err;

                    EmailService.sendVerifyEmail(email, verification_code);

                    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
                    //setCookie("token", token, { req, res, maxAge: 60 * 60 * 24 * 7, httpOnly: false, secure: true, domain: ".6anime.tv" })

                    res.status(200).send(token);
                });
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