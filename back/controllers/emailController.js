const nodemailer = require('nodemailer');
const {email,password} = require('./config');

const sendAcceptanceEmail = async (clubEmail) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  let mailOptions = {
    from: email,
    to: clubEmail,
    subject: 'Reservation Accepted',
    text: 'Your reservation has been accepted.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

module.exports = { sendAcceptanceEmail };
