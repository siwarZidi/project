const express = require('express');
const router = express.Router();
const { sendAcceptanceEmail } = require('./emailController');

router.post('/reservation/accept', async (req, res) => {
  const { clubEmail } = req.body;

  try {
    await sendAcceptanceEmail(clubEmail);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
