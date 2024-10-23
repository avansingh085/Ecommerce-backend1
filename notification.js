const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Step 1: Set up your email transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'avansingh085@gmail.com',
        pass: '12345678',
    },
});

// Step 2: Define the cron job
cron.schedule('* * * * *', () => { // Runs every minute
    console.log('Running cron job...');

    // Email notification setup
    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',
        subject: 'Cron Job Notification',
        text: 'This is a test notification from your cron job!',
    };

    // Step 3: Send the email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});
