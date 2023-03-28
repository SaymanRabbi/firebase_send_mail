const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Create a transport object to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL_ACCOUNT@gmail.com',
    pass: 'YOUR_GMAIL_PASSWORD'
  }
});

// Create a function to handle contact form submissions
exports.sendContactEmail = functions.https.onCall((data, context) => {
  // Extract data from the request body
  const name = data.name;
  const email = data.email;
  const message = data.message;

  // Set up the email options
  const mailOptions = {
    from: email,
    to: 'YOUR_GMAIL_ACCOUNT@gmail.com',
    subject: `New message from ${name}`,
    text: message
  };

  // Send the email
  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('Email sent successfully!');
      return { message: 'Email sent successfully!' };
    })
    .catch(error => {
      console.error(error);
      return { error: 'Error sending email!' };
    });
});
