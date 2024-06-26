const EmailValidator = require("email-validator");
const sqlHandler = require("../../../lib/sqlHandler");
const bcrypt = require("bcrypt");
const EmailService = require("../../../lib/EmailService");
const passwordResetLib = require("../../../lib/passwordResetLib");

async function post(req, res, next) {
    const body = req.body;
    if (!body.email) {
        // Reset password
        if (!body.password && !body.token) { return res.status(400).send("Missing required fields"); }
        else {
            if (!passwordResetLib.validateToken(body.token)) { return res.status(400).send("Invalid token"); }
            else {
                // Reset the password
                const email = passwordResetLib.getEmail(body.token);
                const password = body.password;
                // Update the password
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
                sqlHandler.con.query(`SELECT id FROM Users WHERE email = ?`, [email], (err, result) => {
                    if (err) throw err;
                    if (result.length === 0) {
                        return res.status(400).send("Email not found");
                    }

                    // Hash the password
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) throw err;

                        // Update the password
                        sqlHandler.con.query(`UPDATE Users SET password = ? WHERE email = ?`, [hash, email], (err, result) => {
                            if (err) throw err;

                            EmailService.sendPasswordResetConfirmEmail(email);
                            res.status(200);
                        });
                        return res.status(200).send("Password reset successfully");
                    });

                });
            }
        }
    } else {
        if (body.password || body.token) { return res.status(400).send("Invalid request"); }
        // Generate a random token
        const token = passwordResetLib.createToken(body.email);

        // Send the email
        EmailService.sendPasswordResetEmail(body.email, token);

        res.status(200);
    }
}

module.exports = post;