const nodemailer = require('nodemailer');
const fs = require('fs');

function sendVerifyEmail(email, token) {
    // Read the HTML file
    //const htmlContent = fs.readFileSync('email.html', 'utf8');

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 25,
        secure: false,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // Email content with HTML
    const mailOptions = {
        from: 'Noreply <noreply@6anime.tv>',
        to: email,
        subject: 'Verification Email',
        // html: htmlContent // HTML content from the file
        text: `Click the link below to verify your account: https://www.6anime.tv/verify?token=${token}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            return false;
        } else {
            console.log('Email sent:', info.response);
            return true;
        }
    });
}

function sendPasswordResetConfirmEmail(email) {
    // Read the HTML file
    //const htmlContent = fs.readFileSync('email.html', 'utf8');

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 25,
        secure: false,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // Email content with HTML
    const mailOptions = {
        from: 'Noreply <noreply@6anime.tv>',
        to: email,
        subject: 'Password Reset Confirmation Email',
        // html: htmlContent // HTML content from the file
        text: `Your password has been successfully reset. If you did not request this change, please contact us immediately.`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            return false;
        } else {
            console.log('Email sent:', info.response);
            return true;
        }
    });
}

function sendPasswordResetEmail(email, token) {
    // Read the HTML file
    //const htmlContent = fs.readFileSync('email.html', 'utf8');

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 25,
        secure: false,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // Email content with HTML
    const mailOptions = {
        from: 'Noreply <noreply@6anime.tv>',
        to: email,
        subject: 'Password Reset Email',
        // html: htmlContent // HTML content from the file
        text: `Click the link below to reset your password: https://www.6anime.tv/passwordreset?token=${token} \n\nThis link will expire in 10 minutes.\n\nIf you did not request a password reset, please ignore this email.`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            return false;
        } else {
            console.log('Email sent:', info.response);
            return true;
        }
    });
}

module.exports = { sendVerifyEmail, sendPasswordResetEmail, sendPasswordResetConfirmEmail };