const nodemailer = require('nodemailer');
const fs = require('fs');

function sendVerifyEmail(email, token)
{
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
        content: `Click the link below to verify your account: https://www.6anime.tv/verify?token=${token}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}